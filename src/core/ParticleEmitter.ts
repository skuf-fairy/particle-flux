import {ParticleContainer} from './ParticleContainer';
import {
  ExtraOptions,
  IParticle,
  ITicker,
  ParticleEmitterConfig,
  ViewContainer,
  ViewFactory,
  ViewParticle,
} from '../types';
import {ConfigManager} from './ConfigManager';
import {Ticker} from '../utils/Ticker';
import {realRandom} from '../utils/random/RealRandom';
import {isRangeValue} from '../typeguards';
import {updateParticle} from './particle/updateParticle';
import {ShapePointGenerator} from './spawn-shapes/ShapePointGenerator';
import {MAX_SPAWN_CHANCE, MIN_SPAWN_CHANCE} from 'src/constants';

interface UpdateReport {
  currentTime: number;
  prevSpawnTime: number;
  particleCreatedCount: number;
  spawnTimeDelta: number;
}

export class ParticleEmitter<View extends ViewParticle = ViewParticle> {
  public readonly config: ConfigManager<View>;

  // timer time
  private currentTime: number;
  // the time when it will be necessary to freeze the particle
  // private nextSpawnTime: number;
  private currentSpawnInterval: number;
  private prevSpawnTime: number;

  private readonly container: ParticleContainer<View>;
  private readonly ticker: ITicker;
  private readonly shapePointGenerator: ShapePointGenerator;

  private lastUpdateReport: UpdateReport;

  private extraOptions: ExtraOptions;

  constructor(
    viewContainer: ViewContainer<View>,
    viewFactory: ViewFactory<View>,
    initialConfig: ParticleEmitterConfig,
    extraOptions?: ExtraOptions,
  ) {
    this.ticker = new Ticker(this.handleUpdate);
    this.config = new ConfigManager(initialConfig, viewFactory);
    this.shapePointGenerator = new ShapePointGenerator();
    this.container = new ParticleContainer(viewContainer, this.config, this.shapePointGenerator);

    this.currentTime = 0;
    this.currentSpawnInterval = this.getNextSpawnTime();
    this.prevSpawnTime = 0;

    this.lastUpdateReport = {
      currentTime: 0,
      prevSpawnTime: 0,
      particleCreatedCount: 0,
      spawnTimeDelta: 0,
    };

    this.resetTime();

    this.extraOptions = extraOptions || {};

    if (this.config.autoStart === undefined || this.config.autoStart) {
      // при автостарте создается первая волна
      this.startEmit();
    }
  }

  /**
   * create a particle and add to the container no more than the specified max Particles number of particles
   * The emitter starts
   * @param particlesCount number of particles
   */
  public emitOnce(particlesCount: number = 1): void {
    const count = this.getAvailableForEmitParticlesCount(particlesCount);

    for (let i = 0; i < count; i++) {
      // создание через emitOnce не считается за создание волны
      this.emit(0);
    }

    if (!this.isEmitActive()) {
      this.startTime();
    }
  }

  /**
   * Creates a wave of particles, no more than the specified max Particles number of particles
   * The emitter starts
   */
  public emitWave(): void {
    this.createParticleWave(0, 0);

    if (!this.isEmitActive()) {
      this.startTime();
    }
  }

  // помимо старта времени создаст еще и первую волну частиц
  public startEmit(): void {
    this.startTime();

    if (this.currentTime >= 0) {
      this.createParticlesBetweenFrames(0);
    }
  }

  public pauseEmit(): void {
    this.ticker.stop();
  }

  public resumeEmit(): void {
    this.ticker.start();
  }

  /**
   * Stopping the emitter, which means the end of its operation according to the current configuration
   * Cleans the container and resets the time
   */
  public stopEmit(): void {
    this.stopTime();
    this.clean();
  }

  public restart(): void {
    this.stopEmit();
    this.startEmit();
  }

  // cleaning the container
  public clean(): void {
    this.container.clear();
  }

  public destroy(): void {
    this.container.clearViewContainer();
    this.ticker.stop();
  }

  /**
   * true if the emitter is running and compare the particles
   * @returns is the emitter active
   */
  public isEmitActive(): boolean {
    return this.ticker.started;
  }

  public update(elapsedDelta: number, deltaMS: number): UpdateReport {
    return this.handleUpdate(elapsedDelta, deltaMS);
  }

  public updateContainer(elapsedDelta: number, deltaMS: number): void {
    this.container.update(elapsedDelta, deltaMS);
  }

  public getParticlesCount(): number {
    return this.container.getParticlesCount();
  }

  public getParticles(): IParticle<View>[] {
    return this.container.getParticlesArray();
  }

  public fillPool(particlesCount: number): void {
    this.container.fillPool(particlesCount);
  }

  public clearPool(): void {
    this.container.clearPool();
  }

  // updating the container and creating new particles according to the passed configuration
  private handleUpdate = (elapsedDelta: number, deltaMS: number): UpdateReport => {
    const newCurrentTime = this.currentTime + deltaMS;

    // ждем отработки таймаута
    if (newCurrentTime < 0) {
      this.currentTime = newCurrentTime;

      this.updateReport(0, 0);

      return this.lastUpdateReport;
    }

    this.currentTime = newCurrentTime;

    this.container.update(elapsedDelta, deltaMS);

    // if the working time is over
    if (this.currentTime >= this.getSpawnTime()) {
      // if the operating time is up, then we monitor the container, when it is empty, then we need to stop the emitter.
      if (this.container.getParticlesCount() === 0) {
        this.stopTime();
      }

      this.updateReport(0, 0);

      // Otherwise, we just don't let them spawn any further.
      return this.lastUpdateReport;
    }

    const spawnTimeDelta = this.currentTime - (this.prevSpawnTime + this.currentSpawnInterval);

    // Time to create another wave of particles
    if (spawnTimeDelta >= 0) {
      const count = this.createParticlesBetweenFrames(spawnTimeDelta);

      this.prevSpawnTime += this.currentSpawnInterval * count;
      this.currentSpawnInterval = this.getNextSpawnTime();

      this.updateReport(count, spawnTimeDelta);

      return this.lastUpdateReport;
    }

    this.updateReport(0, 0);

    return this.lastUpdateReport;
  };

  // timeInterval - временной отрезок, на котором могли бы создаться частицы
  private createParticlesBetweenFrames(timeInterval: number): number {
    const spawnInterval = this.currentSpawnInterval || 1;
    // сколько раз могли бы заспавниться частицы за прошедшее время между кадрами
    const spawnParticlesWaveCount = Math.floor(timeInterval / spawnInterval) + 1;

    for (let i = 0; i < spawnParticlesWaveCount; i++) {
      // timeInterval - i * spawnInterval - возраст, который успели прожить частицы
      this.createParticleWave(timeInterval - i * spawnInterval, timeInterval);
    }

    return spawnParticlesWaveCount;
  }

  // creates a particle with a transferred chance of creation
  private emit(waveParticleIndex: number): IParticle<View> | undefined {
    if (this.config.spawnChance !== undefined) {
      if (realRandom.generateIntegerNumber(MIN_SPAWN_CHANCE, MAX_SPAWN_CHANCE) <= this.config.spawnChance) {
        return this.container.createParticle(waveParticleIndex);
      }
    } else {
      return this.container.createParticle(waveParticleIndex);
    }
  }

  private getNextSpawnTime(): number {
    const spawnInterval = this.config.spawnInterval;

    if (spawnInterval === undefined) {
      return Number.POSITIVE_INFINITY;
    } else if (isRangeValue(spawnInterval)) {
      return realRandom.generateIntegerNumber(spawnInterval.min, spawnInterval.max);
    } else {
      return spawnInterval;
    }
  }

  // resets the emitter time
  private resetTime(): void {
    this.currentTime = this.config.spawnTimeout !== undefined ? -this.config.spawnTimeout : 0;
    this.currentSpawnInterval = this.getNextSpawnTime();
    this.prevSpawnTime = this.currentTime < 0 ? -this.currentSpawnInterval : 0;
  }

  private getAvailableForEmitParticlesCount(emitParticlesCount: number): number {
    const particlesInContainer = this.container.getParticlesCount();
    const maxParticles = this.config.maxParticles;

    return !maxParticles
      ? emitParticlesCount
      : Math.min(Math.max(0, maxParticles - particlesInContainer), emitParticlesCount);
  }

  private getSpawnTime(): number {
    return Math.abs(this.config.spawnTime || Number.POSITIVE_INFINITY);
  }

  private startTime(): void {
    this.resetTime();
    this.ticker.start();
    this.extraOptions.onStartEmit?.();
  }

  private stopTime(): void {
    this.ticker.stop();
    this.resetTime();
    this.extraOptions.onStopEmit?.();
  }

  private createParticleWave(particleAge: number, timeInterval: number): void {
    const countPerWave = this.config.spawnParticlesPerWave || 1;
    const count = this.getAvailableForEmitParticlesCount(countPerWave);

    for (let i = 0; i < count; i++) {
      if (this.config.spawnShape?.isGroupWave) {
        this.shapePointGenerator.reset();
      }

      const particle = this.emit(i);
      if (particle && particleAge > 0) {
        updateParticle(particle, particleAge / (timeInterval || 1), particleAge);
      }
    }

    this.shapePointGenerator.refresh();
  }

  private updateReport(particleCreatedCount: number, spawnTimeDelta: number): void {
    this.lastUpdateReport.currentTime = this.currentTime;
    this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
    this.lastUpdateReport.particleCreatedCount = particleCreatedCount;
    this.lastUpdateReport.spawnTimeDelta = spawnTimeDelta;
  }
}
