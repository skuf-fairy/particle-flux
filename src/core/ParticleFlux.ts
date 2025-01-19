import {ParticleEmitter} from './ParticleEmitter';
import {ParticleContainer} from './ParticleContainer';
import {ParticleFluxConfig, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {ConfigManager} from './ConfigManager';
import {ParticleBehaviorFactory} from './ParticleBehaviorFactory';
import {Ticker} from 'src/utils/Ticker';

export class ParticleFlux {
  public readonly emitter: ParticleEmitter;
  public readonly container: ParticleContainer;
  public readonly config: ConfigManager;

  constructor(
    private readonly viewContainer: ViewContainer<ViewParticle>,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly initialConfig: ParticleFluxConfig,
  ) {
    this.config = new ConfigManager(this.initialConfig, this.viewFactory);
    this.container = new ParticleContainer(new ParticleBehaviorFactory(this.viewContainer, this.config));
    this.emitter = new ParticleEmitter(this.container, this.config, new Ticker());
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

  public cleanUp(): void {
    this.emitter.clean();
  }
}
