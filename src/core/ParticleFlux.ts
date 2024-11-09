import {Emitter} from './Emitter';
import {ParticleContainer} from './ParticleContainer';
import {EmitterConfig, ParticleBehaviorConfig, ViewContainer, ViewRenderFn} from '../types';
import {ParticleFactory} from './ParticleFactory';

export class ParticleFlux {
  public readonly emitter: Emitter;
  public readonly container: ParticleContainer;

  constructor(
    private readonly viewContainer: ViewContainer,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly emitterConfig: EmitterConfig,
    private readonly particleConfig: ParticleBehaviorConfig,
  ) {
    this.container = new ParticleContainer(
      this.viewContainer,
      new ParticleFactory(this.viewFactory, this.particleConfig),
    );
    this.emitter = new Emitter(this.container, this.emitterConfig);
  }

  public startEmit(): void {
    this.emitter.startEmit();
  }

  public pauseEmit(): void {
    this.emitter.stopEmit();
  }

  public stopEmit(): void {
    this.emitter.stopEmit();
    this.container.clear();
  }

  public cleanUp(): void {
    this.emitter.clean();
  }
}
