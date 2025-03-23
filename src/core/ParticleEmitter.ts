import {ParticleContainer} from './ParticleContainer';
import {
  IParticle,
  IParticleContainer,
  ITicker,
  ParticleFluxConfig,
  ViewContainer,
  ViewParticle,
  ViewRenderFn,
} from '../types';
import {ConfigManager} from './ConfigManager';
import {Ticker} from '../utils/Ticker';
import {Particle} from './Particle';
import {realRandom} from '../utils/random/RealRandom';
import {isRangeValue} from '../typeguards';

export class ParticleEmitter<V extends ViewParticle = ViewParticle> {
  // timer time
  private currentTime: number;
  // the time when it will be necessary to freeze the particle
  private nextSpawnTime: number | null;

  private readonly container: IParticleContainer;
  private readonly config: ConfigManager;
  private readonly ticker: ITicker;

  constructor(
    viewContainer: ViewContainer<V>,
    viewFactory: ViewRenderFn[] | ViewRenderFn,
    initialConfig: ParticleFluxConfig,
  ) {
    this.ticker = Ticker.getInstance();
    this.config = new ConfigManager(initialConfig, viewFactory);
    this.container = new ParticleContainer(
      () => new Particle(viewContainer, this.config.view, this.config.particleConfig),
    );

    this.ticker.setCallback(this.handleUpdate);

    this.currentTime = 0;
    this.nextSpawnTime = this.getNextSpawnTime();

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

    // we start the emitter if it is stopped
    if (!this.ticker.started) {
      this.startEmit();
    }
  }

  /**
   * Creates a wave of particles, no more than the specified max Particles number of particles
   * The emitter starts
   */
  public emitWave(): void {
    const countPerWave = this.config.spawnParticlesPerWave || 1;
    const count = this.getAvailableForEmitParticlesCount(countPerWave);

    for (let i = 0; i < count; i++) {
      this.emit();
    }

    // we start the emitter if it is stopped
    if (!this.ticker.started) {
      this.startEmit();
    }
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

  // cleaning the container
  public clean(): void {
    this.container.clear();
  }

  /**
   * true if the emitter is running and compare the particles
   * @returns is the emitter active
   */
  public isEmitActive(): boolean {
    return this.ticker.started;
  }

  public update(elapsedDelta: number, deltaMS: number): void {
    this.handleUpdate(elapsedDelta, deltaMS);
  }

  public updateContainer(elapsedDelta: number, deltaMS: number): void {
    this.container.update(elapsedDelta, deltaMS);
  }

  public getParticlesCount(): number {
    return this.container.getParticlesCount();
  }

  public getParticles(): IParticle[] {
    return this.container.getParticles();
  }

  // updating the container and creating new particles according to the passed configuration
  private handleUpdate = (elapsedDelta: number, deltaMS: number): void => {
    this.currentTime += deltaMS;

    if (this.currentTime < 0) return;

    this.container.update(elapsedDelta, deltaMS);

    // if the working time is over
    if (this.config.spawnTime !== undefined && this.currentTime >= this.config.spawnTime) {
      // if the operating time is up, then we monitor the container, when it is empty, then we need to stop the emitter.
      if (this.container.getParticlesCount() === 0) {
        this.stopEmit();
      }

      // Otherwise, we just don't let them spawn any further.
      return;
    }

    // Time to create another wave of particles
    if (this.nextSpawnTime !== null && this.currentTime >= this.nextSpawnTime) {
      this.emitWave();
      this.nextSpawnTime = this.getNextSpawnTime();
    }
  };

  // creates a particle with a transferred chance of creation
  private emit(): void {
    if (this.config.spawnChance !== undefined) {
      if (realRandom.generateIntegerNumber(1, 100) <= this.config.spawnChance) {
        this.container.addParticle();
      }
    } else {
      this.container.addParticle();
    }
  }

  private getNextSpawnTime(): number | null {
    const spawnInterval = this.config.spawnInterval;

    if (spawnInterval === undefined) return null;

    if (isRangeValue(spawnInterval))
      return this.currentTime + realRandom.generateIntegerNumber(spawnInterval.min, spawnInterval.max);

    return this.currentTime + spawnInterval;
  }

  // resets the emitter time
  private resetTime(): void {
    this.currentTime = this.config.spawnTimeout !== undefined ? -this.config.spawnTimeout : 0;
    // The first wave creation should be at the start of the emitter operation, then the time of the next wave will be set.
    this.nextSpawnTime = this.config.spawnInterval !== undefined ? 0 : null;
  }

  private getAvailableForEmitParticlesCount(emitParticlesCount: number): number {
    const particlesInContainer = this.container.getParticlesCount();
    const maxParticles = this.config.maxParticles;

    return !maxParticles
      ? emitParticlesCount
      : Math.min(Math.max(0, maxParticles - particlesInContainer), emitParticlesCount);
  }
}
