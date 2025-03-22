import {ParticleEmitter} from './ParticleEmitter';
import {ParticleContainer} from './ParticleContainer';
import {IParticle, ParticleFluxConfig, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {ConfigManager} from './ConfigManager';
import {Ticker} from '../utils/Ticker';
import {Particle} from './Particle';

export class ParticleFlux<V extends ViewParticle = ViewParticle> {
  public readonly emitter: ParticleEmitter;
  public readonly container: ParticleContainer;
  public readonly config: ConfigManager;

  constructor(
    private readonly viewContainer: ViewContainer<V>,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly initialConfig: ParticleFluxConfig,
  ) {
    this.config = new ConfigManager(this.initialConfig, this.viewFactory);
    this.container = new ParticleContainer(
      () => new Particle(this.viewContainer, this.config.view, this.config.particleConfig),
    );
    this.emitter = new ParticleEmitter(this.container, this.config, new Ticker());
  }

  public emitOnce(particlesCount: number = 1): void {
    this.emitter.emitOnce(particlesCount);
  }

  public emitWave(): void {
    this.emitter.emitWave();
  }

  public startEmit(): void {
    this.emitter.startEmit();
  }

  public pauseEmit(): void {
    this.emitter.pauseEmit();
  }

  public stopEmit(): void {
    this.emitter.stopEmit();
  }

  public clean(): void {
    this.emitter.clean();
  }

  public isEmitterActive(): boolean {
    return this.emitter.isActive();
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
}
