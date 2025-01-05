import {Particle} from '../core/Particle';
import {isScalarBehaviorConfig, isScriptBehaviorConfig} from '../base-behaviors/base-behaviors.typeguards';
import {PathBehavior} from '../behaviors/PathBehavior/PathBehavior';
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
  ParticleViewPortBehaviorConfig,
  IParticle,
  IParticleComponent,
  ViewParticle,
  ViewRenderFn,
  IParticleFactory,
  ViewContainer,
} from '../types';
import {RealRandom} from '../utils/random/RealRandom';
import {ParticleContainer} from '../core/ParticleContainer';
import {ViewComponent} from '../components/ViewComponent/ViewComponent';
import {DirectionBehavior} from '../behaviors/DirectionBehavior/DirectionBehavior';
import {GravityBehavior} from '../behaviors/GravityBehavior/GravityBehavior';
import {AlphaScalarBehavior} from '../behaviors/AlphaBehavior/AlphaScalarBehavior/AlphaScalarBehavior';
import {ScaleScalarBehavior} from '../behaviors/ScaleBehavior/ScaleScalarBehavior/ScaleScalarBehavior';
import {SpawnPositionBehavior} from '../behaviors/SpawnPositionBehavior/SpawnPositionBehavior';
import {isDeltaBehaviorConfig} from '../base-behaviors/DeltaBehavior/DeltaBehavior.typeguards';
import {DeltaRotationBehavior} from '../behaviors/RotationBehavior/DeltaRotationBehavior/DeltaRotationBehavior';
import {ScalarRotationBehavior} from '../behaviors/RotationBehavior/ScalarRotationBehavior/ScalarRotationBehavior';

export class ParticleViewPortBehaviorFactory implements IParticleFactory {
  constructor(
    private readonly viewContainer: ViewContainer<ViewParticle>,
    private readonly viewFactory: ViewRenderFn[] | ViewRenderFn,
    private readonly config: ParticleViewPortBehaviorConfig,
    private readonly customComponents?: IParticleComponent[],
  ) {}

  public create(container: ParticleContainer): IParticle {
    const particle = new Particle(this.createView(), container);

    if (this.config.speed) {
      if (isScriptBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScriptBehavior(this.config.speed));
      }
      if (isScalarBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScalarBehavior(this.config.speed));
      }
    }

    if (this.config.alpha) {
      particle.addComponent(new AlphaScalarBehavior(this.config.alpha));
    }

    if (this.config.scale) {
      particle.addComponent(new ScaleScalarBehavior(this.config.scale));
    }

    if (this.config.spawnPosition) {
      particle.addComponent(new SpawnPositionBehavior(this.config.spawnPosition));
    }

    if (this.config.spawnShape) {
      particle.addComponent(this.getSpawnBehaviorByShapeType(this.config.spawnShape));
    }

    if (this.config.path) {
      particle.addComponent(new PathBehavior(this.config.path));
    }

    if (this.config.viewportLife) {
      particle.addComponent(new ViewportLifeBehavior(this.config.viewportLife));
    }

    if (this.config.gravity) {
      particle.addComponent(new GravityBehavior(this.config.gravity));
    }

    if (this.config.direction) {
      particle.addComponent(new DirectionBehavior(this.config.direction));
    }

    if (this.config.rotation) {
      if (isDeltaBehaviorConfig(this.config.rotation)) {
        particle.addComponent(new DeltaRotationBehavior(this.config.rotation));
      }

      if (isScalarBehaviorConfig(this.config.rotation)) {
        particle.addComponent(new ScalarRotationBehavior(this.config.rotation));
      }
    }

    if (this.customComponents) {
      particle.addComponent(...this.customComponents);
    }

    // components
    particle.addComponent(new TimeComponent());
    particle.addComponent(new ViewComponent(this.viewContainer));

    if (this.config.path) {
      particle.addComponent(new PathMovementComponent());
    } else {
      particle.addComponent(new MovementComponent());
    }

    return particle;
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
