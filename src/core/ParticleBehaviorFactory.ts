import {Particle} from './Particle';
import {isVectorBehaviorConfig} from '../base-behaviors/VectorBehavior/VectorBehavior.typeguards';
import {isScalarBehaviorConfig} from '../base-behaviors/ScalarBehavior/ScalarBehavior.typeguards';
import {isScriptBehaviorConfig} from '../base-behaviors/ScriptBehavior/ScriptBehavior.typeguards';
import {AlphaScalarBehavior} from '../behaviors/AlphaBehavior/AlphaScalarBehavior/AlphaScalarBehavior';
import {AlphaScriptBehavior} from '../behaviors/AlphaBehavior/AlphaScriptBehavior/AlphaScriptBehavior';
import {ColorDynamicBehavior} from '../behaviors/ColorBehavior/ColorDynamicBehavior/ColorDynamicBehavior';
import {ColorScriptBehavior} from '../behaviors/ColorBehavior/ColorScriptBehavior/ColorScriptBehavior';
import {ColorStaticBehavior} from '../behaviors/ColorBehavior/ColorStaticBehavior/ColorStaticBehavior';
import {DirectionBehavior} from '../behaviors/DirectionBehavior/DirectionBehavior';
import {GravityBehavior} from '../behaviors/GravityBehavior/GravityBehavior';
import {LifeTimeBehavior} from '../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {PathBehavior} from '../behaviors/PathBehavior/PathBehavior';
import {ScalarRotationBehavior} from '../behaviors/RotationBehavior/ScalarRotationBehavior/ScalarRotationBehavior';
import {ScaleScalarBehavior} from '../behaviors/ScaleBehavior/ScaleScalarBehavior/ScaleScalarBehavior';
import {ScaleScriptBehavior} from '../behaviors/ScaleBehavior/ScaleScriptBehavior/ScaleScriptBehavior';
import {ScaleVectorBehavior} from '../behaviors/ScaleBehavior/ScaleVectorBehavior/ScaleVectorBehavior';
import {SpawnShapeBehavior, SpawnShapeType} from '../behaviors/SpawnBehaviors/SpawnBehaviors.types';
import {SpawnTorusBehavior} from '../behaviors/SpawnBehaviors/SpawnTorusBehavior';
import {SpawnPointBehavior} from '../behaviors/SpawnBehaviors/SpawnPointBehavior';
import {SpawnPolygonalChainBehavior} from '../behaviors/SpawnBehaviors/SpawnPolygonalChainBehavior';
import {SpawnRectangleBehavior} from '../behaviors/SpawnBehaviors/SpawnRectangleBehavior';
import {SpeedScalarBehavior} from '../behaviors/SpeedBehavior/SpeedScalarBehavior/SpeedScalarBehavior';
import {SpeedScriptBehavior} from '../behaviors/SpeedBehavior/SpeedScriptBehavior/SpeedScriptBehavior';
import {MovementComponent} from '../components/MovementComponent/MovementComponent';
import {PathMovementComponent} from '../components/PathMovementComponent/PathMovementComponent';
import {IParticle, IParticleComponent, ViewParticle, IParticleFactory, ViewContainer} from '../types';
import {realRandom} from '../utils/random/RealRandom';
import {ScriptRotationBehavior} from '../behaviors/RotationBehavior/ScriptRotationBehavior/RotationScriptBehavior';
import {ViewComponent} from '../components/ViewComponent/ViewComponent';
import {SpawnPositionBehavior} from '../behaviors/SpawnPositionBehavior/SpawnPositionBehavior';
import {isDeltaBehaviorConfig} from '../base-behaviors/DeltaBehavior/DeltaBehavior.typeguards';
import {DeltaRotationBehavior} from '../behaviors/RotationBehavior/DeltaRotationBehavior/DeltaRotationBehavior';
import {ConfigManager} from './ConfigManager';
import {
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
} from '../behaviors/ColorBehavior/ColorBehavior.typeguards';

export class ParticleBehaviorFactory implements IParticleFactory {
  constructor(private readonly viewContainer: ViewContainer<ViewParticle>, private readonly config: ConfigManager) {}

  public create(): IParticle {
    const particle = new Particle(this.createView());

    // The first thing to do is add a display component so that the rest initialize the view.
    particle.addComponent(new ViewComponent(this.viewContainer));

    if (this.config.lifeTime) {
      particle.addComponent(new LifeTimeBehavior(this.config.lifeTime));
    }

    if (this.config.speed) {
      if (isScriptBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScriptBehavior(this.config.speed));
      } else if (isScalarBehaviorConfig(this.config.speed)) {
        particle.addComponent(new SpeedScalarBehavior(this.config.speed));
      }
    }

    if (this.config.spawnPosition) {
      particle.addComponent(new SpawnPositionBehavior(this.config.spawnPosition));
    }

    if (this.config.spawnShape) {
      particle.addComponent(this.getSpawnBehaviorByShapeType(this.config.spawnShape));
    } else {
      particle.addComponent(
        new SpawnPointBehavior({
          type: SpawnShapeType.Point,
          x: 0,
          y: 0,
        }),
      );
    }

    if (this.config.alpha) {
      if (isScriptBehaviorConfig(this.config.alpha)) {
        particle.addComponent(new AlphaScriptBehavior(this.config.alpha));
      } else if (isScalarBehaviorConfig(this.config.alpha)) {
        particle.addComponent(new AlphaScalarBehavior(this.config.alpha));
      }
    }

    if (this.config.color) {
      if (isColorScriptBehaviorConfig(this.config.color)) {
        particle.addComponent(new ColorScriptBehavior(this.config.color));
      } else if (isColorStaticBehaviorConfig(this.config.color)) {
        particle.addComponent(new ColorStaticBehavior(this.config.color));
      } else if (isColorDynamicBehaviorConfig(this.config.color)) {
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
      } else if (isScriptBehaviorConfig(this.config.scale)) {
        particle.addComponent(new ScaleScriptBehavior(this.config.scale));
      } else if (isVectorBehaviorConfig(this.config.scale)) {
        particle.addComponent(new ScaleVectorBehavior(this.config.scale));
      }
    }

    if (this.config.gravity) {
      particle.addComponent(new GravityBehavior(this.config.gravity));
    }

    if (this.config.rotation) {
      if (isDeltaBehaviorConfig(this.config.rotation)) {
        particle.addComponent(new DeltaRotationBehavior(this.config.rotation));
      } else if (isScalarBehaviorConfig(this.config.rotation)) {
        particle.addComponent(new ScalarRotationBehavior(this.config.rotation));
      } else if (isScriptBehaviorConfig(this.config.rotation)) {
        particle.addComponent(new ScriptRotationBehavior(this.config.rotation));
      }
    }

    if (this.config.path) {
      particle.addComponent(new PathMovementComponent());
    } else {
      particle.addComponent(new MovementComponent());
    }

    particle.init();

    return particle;
  }

  private getSpawnBehaviorByShapeType(shape: SpawnShapeBehavior): IParticleComponent {
    switch (shape.type) {
      case SpawnShapeType.Point:
        return new SpawnPointBehavior(shape);

      case SpawnShapeType.Rectangle:
        return new SpawnRectangleBehavior(shape);

      case SpawnShapeType.Torus:
        return new SpawnTorusBehavior(shape);

      case SpawnShapeType.Polygon:
        return new SpawnPolygonalChainBehavior(shape);
    }
  }

  private createView(): ViewParticle {
    const viewFactory = this.config.view;
    return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
  }
}
