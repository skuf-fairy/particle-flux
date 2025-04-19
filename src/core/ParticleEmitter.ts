import {ParticleContainer} from './ParticleContainer';
import {IParticle, ITicker, ParticleEmitterConfig, ViewContainer, ViewFactory, ViewParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {Ticker} from '../utils/Ticker';
import {realRandom} from '../utils/random/RealRandom';
import {isRangeValue} from '../typeguards';
import {updateParticle} from './particle/updateParticle';

interface UpdateReport {
  currentTime: number;
  prevSpawnTime: number;
  particleCreatedCount: number;
  deltaBetweenCurrentTimeAndCurrentSpawnTime: number;
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

  private skipFirstEmit: boolean;

  private lastUpdateReport: UpdateReport;

  constructor(
    viewContainer: ViewContainer<View>,
    viewFactory: ViewFactory<View>,
    initialConfig: ParticleEmitterConfig,
  ) {
    this.ticker = new Ticker(this.handleUpdate);
    this.config = new ConfigManager(initialConfig, viewFactory);
    this.container = new ParticleContainer(viewContainer, this.config);

    this.skipFirstEmit = false;
    this.currentTime = 0;
    this.currentSpawnInterval = this.getNextSpawnTime();
    this.prevSpawnTime = 0;

    this.lastUpdateReport = {
      currentTime: 0,
      prevSpawnTime: 0,
      particleCreatedCount: 0,
      deltaBetweenCurrentTimeAndCurrentSpawnTime: 0,
    };

    this.resetTime();

    if (this.config.autoStart === undefined || this.config.autoStart) {
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
      this.emit();
    }

    if (!this.isEmitActive()) {
      this.skipFirstEmit = true;
      this.startEmit();
    }
  }

  /**
   * Creates a wave of particles, no more than the specified max Particles number of particles
   * The emitter starts
   */
  public emitWave(): IParticle<View>[] {
    const countPerWave = this.config.spawnParticlesPerWave || 1;
    const count = this.getAvailableForEmitParticlesCount(countPerWave);
    const particles: IParticle<View>[] = [];

    for (let i = 0; i < count; i++) {
      const particle = this.emit();
      if (particle) {
        particles.push(particle);
      }
    }

    if (!this.isEmitActive()) {
      this.skipFirstEmit = true;
      this.startEmit();
    }

    return particles;
  }

  public startEmit(): void {
    this.resetTime();
    this.ticker.start();
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
    this.ticker.stop();
    this.clean();
    this.resetTime();
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

      this.lastUpdateReport.currentTime = this.currentTime;
      this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
      this.lastUpdateReport.particleCreatedCount = 0;
      this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = 0;

      return this.lastUpdateReport;
    }

    // первый кадр, нужно заспавнить первую волну
    if (this.currentTime === 0 && !this.skipFirstEmit) {
      const deltaBetweenCurrentTimeAndCurrentSpawnTime = Math.max(0, newCurrentTime - this.currentSpawnInterval);
      const count = this.createParticlesBetweenFrames(deltaBetweenCurrentTimeAndCurrentSpawnTime, newCurrentTime);
      this.prevSpawnTime = count > 1 ? this.currentSpawnInterval * count : 0;
      this.currentTime = newCurrentTime;

      this.lastUpdateReport.currentTime = this.currentTime;
      this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
      this.lastUpdateReport.particleCreatedCount = count;
      this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = deltaBetweenCurrentTimeAndCurrentSpawnTime;

      return this.lastUpdateReport;
    }
    // выходим из таймаута, нужно спавнить первую волну
    else if (this.currentTime <= 0 && newCurrentTime >= 0) {
      const deltaBetweenCurrentTimeAndCurrentSpawnTime = Math.max(0, newCurrentTime - this.currentSpawnInterval);

      const count = this.createParticlesBetweenFrames(deltaBetweenCurrentTimeAndCurrentSpawnTime, newCurrentTime);
      this.prevSpawnTime = count > 1 ? this.currentSpawnInterval * count : 0;
      this.currentTime = newCurrentTime;

      this.lastUpdateReport.currentTime = this.currentTime;
      this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
      this.lastUpdateReport.particleCreatedCount = count;
      this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = this.currentTime + deltaMS;

      return this.lastUpdateReport;
    }

    this.currentTime = newCurrentTime;

    this.container.update(elapsedDelta, deltaMS);

    // if the working time is over
    if (this.currentTime >= this.getSpawnTime()) {
      // if the operating time is up, then we monitor the container, when it is empty, then we need to stop the emitter.
      if (this.container.getParticlesCount() === 0) {
        this.stopEmit();
      }

      this.lastUpdateReport.currentTime = this.currentTime;
      this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
      this.lastUpdateReport.particleCreatedCount = 0;
      this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = 0;

      // Otherwise, we just don't let them spawn any further.
      return this.lastUpdateReport;
    }

    const deltaBetweenCurrentTimeAndCurrentSpawnTime =
      this.currentTime - (this.prevSpawnTime + this.currentSpawnInterval);

    // Time to create another wave of particles
    if (deltaBetweenCurrentTimeAndCurrentSpawnTime >= 0) {
      const count = this.createParticlesBetweenFrames(deltaBetweenCurrentTimeAndCurrentSpawnTime, deltaMS);

      this.prevSpawnTime += this.currentSpawnInterval * count;
      this.currentSpawnInterval = this.getNextSpawnTime();

      this.lastUpdateReport.currentTime = this.currentTime;
      this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
      this.lastUpdateReport.particleCreatedCount = count;
      this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = deltaBetweenCurrentTimeAndCurrentSpawnTime;

      return this.lastUpdateReport;
    }

    this.lastUpdateReport.currentTime = this.currentTime;
    this.lastUpdateReport.prevSpawnTime = this.prevSpawnTime;
    this.lastUpdateReport.particleCreatedCount = 0;
    this.lastUpdateReport.deltaBetweenCurrentTimeAndCurrentSpawnTime = 0;

    return this.lastUpdateReport;
  };

  private createParticlesBetweenFrames(deltaBetweenCurrentTimeAndCurrentSpawnTime: number, deltaMS: number): number {
    const spawnInterval = this.currentSpawnInterval || 1;
    // время задержки спавна
    // сколько раз могли бы заспавниться частицы за прошедшее время между кадрами
    const count = Math.floor(deltaBetweenCurrentTimeAndCurrentSpawnTime / spawnInterval) + 1;

    for (let i = 0; i < count; i++) {
      const particles = this.emitWave();

      // возраст, который успели прожить частицы, до handleUpdate
      const particleAge = deltaBetweenCurrentTimeAndCurrentSpawnTime - i * spawnInterval;
      if (particleAge > 0) {
        particles.forEach((p) => {
          updateParticle(p, particleAge / deltaMS, particleAge);
        });
      }
    }

    return count;
  }

  // creates a particle with a transferred chance of creation
  private emit(): IParticle<View> | undefined {
    if (this.config.spawnChance !== undefined) {
      if (realRandom.generateIntegerNumber(1, 100) <= this.config.spawnChance) {
        return this.container.createParticle();
      }
    } else {
      return this.container.createParticle();
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
    this.skipFirstEmit = false;
    this.currentTime = this.config.spawnTimeout !== undefined ? -this.config.spawnTimeout : 0;
    this.prevSpawnTime = 0;
    this.currentSpawnInterval = this.getNextSpawnTime();
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
}
