import {Particle} from './Particle';
import {
  isScalarBehaviorConfig,
  isScriptBehaviorConfig,
  isVectorBehaviorConfig,
} from '../base-behaviors/base-behaviors.typeguards';
import {AlphaScalarBehavior} from '../behaviors/AlphaBehavior/AlphaScalarBehavior/AlphaScalarBehavior';
import {AlphaScriptBehavior} from '../behaviors/AlphaBehavior/AlphaScriptBehavior/AlphaScriptBehavior';
import {
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
} from '../behaviors/ColorBehavior/ColorBehavior.types';
import {ColorDynamicBehavior} from '../behaviors/ColorBehavior/ColorDynamicBehavior/ColorDynamicBehavior';
import {ColorScriptBehavior} from '../behaviors/ColorBehavior/ColorScriptBehavior/ColorScriptBehavior';
import {ColorStaticBehavior} from '../behaviors/ColorBehavior/ColorStaticBehavior/ColorStaticBehavior';
import {DirectionBehavior} from '../behaviors/DirectionBehavior/DirectionBehavior';
import {GravityBehavior} from '../behaviors/GravityBehavior/GravityBehavior';
import {LifeTimeBehavior} from '../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {PathBehavior} from '../behaviors/PathBehavior/PathBehavior';
import {RotationBehavior} from '../behaviors/RotationBehavior/RotationBehavior';
import {RotationSpeedBehavior} from '../behaviors/RotationSpeedBehavior/RotationSpeedBehavior';
import {ScaleScalarBehavior} from '../behaviors/ScaleBehavior/ScaleScalarBehavior/ScaleScalarBehavior';
import {ScaleScriptBehavior} from '../behaviors/ScaleBehavior/ScaleScriptBehavior/ScaleScriptBehavior';
import {ScaleVectorBehavior} from '../behaviors/ScaleBehavior/ScaleVectorBehavior/ScaleVectorBehavior';
import {SpawnShape, SpawnShapeType} from '../behaviors/SpawnBehaviors/SpawnBehaviors.types';
import {SpawnCircleBehavior} from '../behaviors/SpawnBehaviors/SpawnCircleBehavior';
import {SpawnPointBehavior} from '../behaviors/SpawnBehaviors/SpawnPointBehavior';
import {SpawnPolygonalChainBehavior} from '../behaviors/SpawnBehaviors/SpawnPolygonalChainBehavior';
import {SpawnRectangleBehavior} from '../behaviors/SpawnBehaviors/SpawnRectangleBehavior';
import {SpeedScalarBehavior} from '../behaviors/SpeedBehavior/SpeedScalarBehavior/SpeedScalarBehavior';
import {SpeedScriptBehavior} from '../behaviors/SpeedBehavior/SpeedScriptBehavior/SpeedScriptBehavior';
import {ViewportLifeBehavior} from '../behaviors/ViewportLifeBehavior/ViewportLifeBehavior';
import {MovementComponent} from '../components/MovementComponent/MovementComponent';
import {PathMovementComponent} from '../components/PathMovementComponent/PathMovementComponent';
import {TimeComponent} from '../components/TimeComponent/TimeComponent';
import {
  ParticleBehaviorConfig,
  IParticle,
  IParticleComponent,
  ViewParticle,
  ViewRenderFn,
  IParticleFactory,
} from 'src/types';
import {RealRandom} from 'src/utils/random/RealRandom';
import {ParticleContainer} from './ParticleContainer';

export class ParticleFactory implements IParticleFactory {
  constructor(
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private config: ParticleBehaviorConfig,
    private readonly customComponents?: IParticleComponent[],
  ) {}

  public create(container: ParticleContainer): IParticle {
    const particle = new Particle(this.createView(), container);

    if (this.config.lifeTime) {
      particle.addComponent(new LifeTimeBehavior(this.config.lifeTime));
    }

    if (this.config.speed) {
      if (isScriptBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScriptBehavior(this.config.speed));
      }
      if (isScalarBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScalarBehavior(this.config.speed));
      }
    }

    if (this.config.spawnShape) {
      particle.addComponent(this.getSpawnBehaviorByShapeType(this.config.spawnShape));
    }

    if (this.config.alpha) {
      if (isScriptBehaviorConfig(this.config.alpha)) {
        particle.addComponent(new AlphaScriptBehavior(this.config.alpha));
      }
      if (isScalarBehaviorConfig(this.config.alpha)) {
        particle.addComponent(new AlphaScalarBehavior(this.config.alpha));
      }
    }

    if (this.config.color) {
      if (isColorScriptBehaviorConfig(this.config.color)) {
        particle.addComponent(new ColorScriptBehavior(this.config.color));
      }
      if (isColorStaticBehaviorConfig(this.config.color)) {
        particle.addComponent(new ColorStaticBehavior(this.config.color));
      }
      if (isColorDynamicBehaviorConfig(this.config.color)) {
        particle.addComponent(new ColorDynamicBehavior(this.config.color));
      }
    }

    if (this.config.direction) {
      particle.addComponent(new DirectionBehavior(this.config.direction));
    }

    if (this.config.path) {
      particle.addComponent(new PathBehavior(this.config.path));
    }

    if (this.config.scale) {
      if (isScalarBehaviorConfig(this.config.scale)) {
        particle.addComponent(new ScaleScalarBehavior(this.config.scale));
      }

      if (isScriptBehaviorConfig(this.config.scale)) {
        particle.addComponent(new ScaleScriptBehavior(this.config.scale));
      }

      if (isVectorBehaviorConfig(this.config.scale)) {
        particle.addComponent(new ScaleVectorBehavior(this.config.scale));
      }
    }

    if (this.config.gravity) {
      particle.addComponent(new GravityBehavior(this.config.gravity));
    }

    if (this.config.rotationSpeed) {
      particle.addComponent(new RotationSpeedBehavior(this.config.rotationSpeed));
    }

    if (this.config.rotation) {
      particle.addComponent(new RotationBehavior(this.config.rotation));
    }

    if (this.config.viewportLife) {
      particle.addComponent(new ViewportLifeBehavior(this.config.viewportLife));
    }

    if (this.customComponents) {
      particle.addComponent(...this.customComponents);
    }

    // components
    particle.addComponent(new TimeComponent());

    if (this.config.path) {
      particle.addComponent(new PathMovementComponent());
    } else {
      particle.addComponent(new MovementComponent());
    }

    return particle;
  }

  public setParticleConfig(config: ParticleBehaviorConfig): void {
    this.config = config;
  }

  public updateParticleConfig<T extends keyof ParticleBehaviorConfig>(key: T, value: ParticleBehaviorConfig[T]): void {
    this.config[key] = value;
  }

  private getSpawnBehaviorByShapeType(shape: SpawnShape): IParticleComponent {
    switch (shape.type) {
      case SpawnShapeType.Point:
        return new SpawnPointBehavior(shape);

      case SpawnShapeType.Rectangle:
        return new SpawnRectangleBehavior(shape);

      case SpawnShapeType.Circle:
        return new SpawnCircleBehavior(shape);

      case SpawnShapeType.Polygon:
        return new SpawnPolygonalChainBehavior(shape);
    }
  }

  private createView(): ViewParticle {
    return Array.isArray(this.viewFactory) ? new RealRandom().choice(this.viewFactory)() : this.viewFactory();
  }
}
