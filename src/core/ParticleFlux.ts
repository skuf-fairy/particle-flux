import {ParticleEmitter} from './ParticleEmitter';
import {ParticleContainer} from './ParticleContainer';
import {EmitterConfig, ParticleBehaviorConfig, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {ParticleLifeTimeBehaviorFactory} from '../particle-factories/ParticleLifeTimeBehaviorFactory';
import {ParticleViewPortBehaviorFactory} from '../particle-factories/ParticleViewPortBehaviorFactory';
import {isParticleLifeTimeBehaviorConfig} from 'src/typeguards';

export class ParticleFlux {
  public readonly emitter: ParticleEmitter;
  public readonly container: ParticleContainer;

  constructor(
    private readonly viewContainer: ViewContainer<ViewParticle>,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly emitterConfig: EmitterConfig,
    private readonly particleConfig: ParticleBehaviorConfig,
  ) {
    this.container = new ParticleContainer(
      isParticleLifeTimeBehaviorConfig(this.particleConfig)
        ? new ParticleLifeTimeBehaviorFactory(this.viewContainer, this.viewFactory, this.particleConfig)
        : new ParticleViewPortBehaviorFactory(this.viewContainer, this.viewFactory, this.particleConfig),
    );
    this.emitter = new ParticleEmitter(this.container, this.emitterConfig);
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
