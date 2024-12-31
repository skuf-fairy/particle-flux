import {ParticleEmitter} from './ParticleEmitter';
import {ParticleContainer} from './ParticleContainer';
import {ParticleFluxConfig, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {ParticleLifeTimeBehaviorFactory} from '../particle-factories/ParticleLifeTimeBehaviorFactory';
import {ParticleViewPortBehaviorFactory} from '../particle-factories/ParticleViewPortBehaviorFactory';
import {isParticleLifeTimeBehaviorConfig} from '../typeguards';

export class ParticleFlux {
  public readonly emitter: ParticleEmitter;
  public readonly container: ParticleContainer;

  constructor(
    private readonly viewContainer: ViewContainer<ViewParticle>,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly config: ParticleFluxConfig,
  ) {
    this.container = new ParticleContainer(
      isParticleLifeTimeBehaviorConfig(this.config.particleBehaviorsConfig)
        ? new ParticleLifeTimeBehaviorFactory(this.viewContainer, this.viewFactory, this.config.particleBehaviorsConfig)
        : new ParticleViewPortBehaviorFactory(
            this.viewContainer,
            this.viewFactory,
            this.config.particleBehaviorsConfig,
          ),
    );
    this.emitter = new ParticleEmitter(this.container, this.config.emitterConfig);
  }

  public startEmit(): void {
    this.emitter.startEmit();
  }

  public pauseEmit(): void {
    this.emitter.stopEmit();
  }

  public stopEmit(): void {
    this.emitter.stopEmit();
  }

  public cleanUp(): void {
    this.emitter.clean();
  }
}
