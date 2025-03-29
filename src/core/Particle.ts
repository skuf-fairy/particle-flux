import {NumberUtils} from '../utils/NumberUtils';
import {IParticle, ParticleConfig, Point2d, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {getLifeTimeBehavior} from './behaviors/life-time-behavior/LifeTimeBehavior';
import {getScalarBehavior} from './base-behaviors/scalar-behavior/ScalarBehavior';
import {isScalarBehaviorConfig} from './base-behaviors/scalar-behavior/ScalarBehavior.typeguards';
import {isScriptBehaviorConfig} from './base-behaviors/script-behavior/ScriptBehavior.typeguards';
import {getScriptBehavior} from './base-behaviors/script-behavior/ScriptBehavior';
import {getDirection} from './direction/getDirection';
import {realRandom} from '../utils/random/RealRandom';
import {Vector2Utils} from '../utils/Vector2Utils';
import {getDeltaBehavior} from './base-behaviors/delta-behavior/DeltaBehavior';
import {isDeltaBehaviorConfig} from './base-behaviors/delta-behavior/DeltaBehavior.typeguards';
import {isVectorBehaviorConfig} from './base-behaviors/vector-behavior/VectorBehavior.typeguards';
import {getVectorBehavior} from './base-behaviors/vector-behavior/VectorBehavior';
import {
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
} from '../core/behaviors/color-behavior/ColorBehavior.typeguards';
import {getColorDynamicBehavior} from '../core/behaviors/color-behavior/ColorDynamicBehavior/ColorDynamicBehavior';
import {getColorStaticBehavior} from '../core/behaviors/color-behavior/ColorStaticBehavior/ColorStaticBehavior';
import {parsePath} from '../utils/parsePath';
import {getSpawnPosition} from './spawn-shapes/getSpawnPosition';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';
import {PathFunction} from './path/path.types';

export type UpdateFunction<V> = (lifeTimeNormalizedProgress: number, elapsedDelta: number) => V;

/*
 * A container class for components and behaviors of a particle
 */
export class Particle implements IParticle {
  // particle display
  public view: ViewParticle | null;
  // particle velocity
  public speed: number;
  // the direction of movement in two-dimensional space
  public direction: Point2d;
  public next: IParticle | null;

  private inUse: boolean;

  private lifeTimeBehavior: (deltaMS: number) => number;
  private speedBehavior: UpdateFunction<number> | null;
  private alphaBehavior: UpdateFunction<number> | null;
  private rotationBehavior: UpdateFunction<number> | null;
  private scaleBehavior: UpdateFunction<Point2d> | null;
  private colorBehavior: UpdateFunction<string> | null;
  private gravityBehavior: UpdateFunction<number> | null;
  private pathFunc: PathFunction | null;

  private deltaPath: Point2d;
  private initialPosition: Point2d;

  constructor(private readonly viewContainer: ViewContainer<ViewParticle>) {
    this.speed = 0;
    this.deltaPath = {x: 0, y: 0};
    this.initialPosition = {x: 0, y: 0};
    this.direction = {x: 0, y: 0};

    this.next = null;

    this.inUse = false;

    this.view = null;

    this.speedBehavior = null;
    this.alphaBehavior = null;
    this.rotationBehavior = null;
    this.scaleBehavior = null;
    this.colorBehavior = null;
    this.gravityBehavior = null;
    this.pathFunc = null;
  }

  public use(viewRenderFn: ViewRenderFn | ViewRenderFn[], config: ParticleConfig): void {
    this.inUse = true;

    this.view = createView(viewRenderFn);

    this.viewContainer.addChild(this.view);

    this.lifeTimeBehavior = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);

    this.initialPosition = config.spawnShape
      ? getSpawnPosition(config.spawnShape, config.spawnPosition)
      : config.spawnPosition || {x: 0, y: 0};

    this.view.position = {...this.initialPosition};

    if (config.direction) {
      this.direction = getDirection(config.direction);
    } else {
      this.direction = {
        x: 0,
        y: 0,
      };
    }

    if (config.speed) {
      if (isScriptBehaviorConfig(config.speed)) {
        this.speedBehavior = getScriptBehavior(config.speed);
      } else if (isScalarBehaviorConfig(config.speed)) {
        this.speedBehavior = getScalarBehavior(config.speed);
      }
    }

    if (config.alpha) {
      if (isScriptBehaviorConfig(config.alpha)) {
        this.alphaBehavior = getScriptBehavior(config.alpha);
      } else if (isScalarBehaviorConfig(config.alpha)) {
        this.alphaBehavior = getScalarBehavior(config.alpha);
      }
    }

    if (config.rotation) {
      if (isDeltaBehaviorConfig(config.rotation)) {
        this.rotationBehavior = getDeltaBehavior(config.rotation);
      } else if (isScalarBehaviorConfig(config.rotation)) {
        this.rotationBehavior = getScalarBehavior(config.rotation);
      } else if (isScriptBehaviorConfig(config.rotation)) {
        this.rotationBehavior = getScriptBehavior(config.rotation);
      }
    }

    if (config.scale) {
      if (isScalarBehaviorConfig(config.scale)) {
        this.scaleBehavior = (lifeTimeNormalizedProgress: number, elapsedDelta: number): Point2d => {
          // @ts-ignore
          const value = getScalarBehavior(config.scale)(lifeTimeNormalizedProgress, elapsedDelta);

          return {
            x: value,
            y: value,
          };
        };
      } else if (isScriptBehaviorConfig(config.scale)) {
        this.scaleBehavior = (lifeTimeNormalizedProgress: number, elapsedDelta: number): Point2d => {
          // @ts-ignore
          const value = getScriptBehavior(config.scale)(lifeTimeNormalizedProgress, elapsedDelta);

          if (typeof value === 'number') {
            return {
              x: value,
              y: value,
            };
          } else {
            return value;
          }
        };
      } else if (isVectorBehaviorConfig(config.scale)) {
        this.scaleBehavior = getVectorBehavior(config.scale);
      }
    }

    if (config.color) {
      if (isColorScriptBehaviorConfig(config.color)) {
        this.colorBehavior = getScriptBehavior(config.color);
      } else if (isColorStaticBehaviorConfig(config.color)) {
        this.colorBehavior = getColorStaticBehavior(config.color);
      } else if (isColorDynamicBehaviorConfig(config.color)) {
        this.colorBehavior = getColorDynamicBehavior(config.color);
      }
    }

    if (config.gravity) {
      this.gravityBehavior = getScalarBehavior(config.gravity);
    }

    if (config.path) {
      this.pathFunc = parsePath(config.path.path);
    }

    this.update(0, 0);
  }

  public update(elapsedDelta: number, deltaMS: number): void {
    if (!this.inUse || this.view === null) return;

    if (this.view.destroyed) {
      this.noUse();
      return;
    }

    const lifeTimeNormalizedProgress = this.lifeTimeBehavior(deltaMS);
    if (isDead(lifeTimeNormalizedProgress)) {
      this.noUse();
      return;
    }

    if (this.speedBehavior !== null) {
      this.speed = this.speedBehavior(lifeTimeNormalizedProgress, elapsedDelta);
    }

    if (this.alphaBehavior !== null) {
      this.view.alpha = this.alphaBehavior(lifeTimeNormalizedProgress, elapsedDelta);
    }

    if (this.rotationBehavior !== null) {
      this.view.angle = this.rotationBehavior(lifeTimeNormalizedProgress, elapsedDelta);
    }

    if (this.scaleBehavior !== null) {
      this.view.scale = this.scaleBehavior(lifeTimeNormalizedProgress, elapsedDelta);
    }

    if (this.colorBehavior !== null) {
      this.view.tint = this.colorBehavior(lifeTimeNormalizedProgress, elapsedDelta);
    }

    const speed = this.speed * elapsedDelta;

    if (this.pathFunc !== null) {
      this.deltaPath.x = this.deltaPath.x + speed;
      this.deltaPath.y = this.pathFunc(this.deltaPath.x);
      const delta = Vector2Utils.rotate(this.deltaPath, -Math.PI / 2);

      this.view.position = {
        x: NumberUtils.roundWith2Precision(this.initialPosition.x + delta.x),
        y: NumberUtils.roundWith2Precision(this.initialPosition.y + delta.y),
      };
    } else {
      // todo наверное лучше накопление
      const gravityShift = this.gravityBehavior ? this.gravityBehavior(lifeTimeNormalizedProgress, elapsedDelta) : 0;

      this.view.position = {
        x: NumberUtils.roundWith2Precision(this.view.position.x + this.direction.x * speed),
        y: NumberUtils.roundWith2Precision(this.view.position.y + (this.direction.y + gravityShift) * speed),
      };
    }
  }

  public noUse(): void {
    if (this.view === null) return;

    this.viewContainer.removeChild(this.view);
    this.view = null;
    this.inUse = false;
  }

  public isInUse(): boolean {
    return this.inUse;
  }
}

function createView(viewFactory: ViewRenderFn | ViewRenderFn[]): ViewParticle {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}

function isDead(lifeTimeNormalizedProgress: number): boolean {
  return lifeTimeNormalizedProgress === 1;
}
