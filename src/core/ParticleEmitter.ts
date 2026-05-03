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
import {ShapePointGenerator} from './spawn-shapes/ShapePointGenerator';
import {ParticleSpawner} from './ParticleSpawner';
import {getRandomValue} from '../utils/getRandomValue';

// отчет для тестов
interface UpdateReport {
  currentTime: number;
  prevSpawnTime: number;
  particleCreatedCount: number;
  spawnTimeDelta: number;
}

export class ParticleEmitter<View extends ViewParticle = ViewParticle> {
  public readonly config: ConfigManager<View>;

  private currentTime: number;
  private currentSpawnInterval: number;
  private prevSpawnTime: number;

  private readonly container: ParticleContainer<View>;
  private readonly ticker: ITicker;
  private readonly shapePointGenerator: ShapePointGenerator;
  private readonly spawner: ParticleSpawner<View>;

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
    this.spawner = new ParticleSpawner(this.config, this.container, this.shapePointGenerator);

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
    this.spawner.emitOnce(particlesCount);

    if (!this.isEmitActive()) {
      this.startTime();
    }
  }

  /**
   * Creates a wave of particles, no more than the specified max Particles number of particles
   * The emitter starts
   */
  public emitWave(): void {
    this.spawner.createParticleWave(0, 0);

    if (!this.isEmitActive()) {
      this.startTime();
    }
  }

  // помимо старта времени создаст еще и первую волну частиц, если нет таймаута
  public startEmit(): void {
    this.startTime();

    if (this.currentTime >= 0) {
      this.spawner.createParticlesBetweenFrames(this.currentSpawnInterval, 0);
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
    this.container.clearActiveParticles();
  }

  public destroy(): void {
    this.container.clearActiveParticlesAndPool();
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
      const count = this.spawner.createParticlesBetweenFrames(this.currentSpawnInterval || 1, spawnTimeDelta);

      this.prevSpawnTime = this.currentTime;
      this.currentSpawnInterval = this.getNextSpawnTime();

      this.updateReport(count, spawnTimeDelta);

      return this.lastUpdateReport;
    }

    this.updateReport(0, 0);

    return this.lastUpdateReport;
  };

  private getNextSpawnTime(): number {
    const spawnInterval = this.config.spawnInterval;

    if (spawnInterval === undefined) {
      return Number.POSITIVE_INFINITY;
    }

    if (typeof spawnInterval === 'number') {
      return spawnInterval;
    } else {
      return getRandomValue(spawnInterval);
    }
  }

  // resets the emitter time
  private resetTime(): void {
    this.currentTime = this.config.spawnTimeout !== undefined ? -this.config.spawnTimeout : 0;
    this.currentSpawnInterval = this.getNextSpawnTime();
    this.prevSpawnTime = this.currentTime < 0 ? -this.currentSpawnInterval : 0;
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

  private updateReport(particleCreatedCount: number, spawnTimeDelta: number): void {
    this.lastUpdateReport.currentTime = this.currentTime;
    this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
    this.lastUpdateReport.particleCreatedCount = particleCreatedCount;
    this.lastUpdateReport.spawnTimeDelta = spawnTimeDelta;
  }
}
