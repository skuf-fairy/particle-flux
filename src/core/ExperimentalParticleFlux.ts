import {ParticleEmitter} from './ParticleEmitter';
import {IParticle, IParticleContainer, ParticleFluxConfig, Point2d, ViewContainer, ViewParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {Ticker} from '../utils/Ticker';
import {realRandom} from '../utils/random/RealRandom';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';
import {NumberUtils} from '../utils/NumberUtils';
import {parsePath} from '../utils/parsePath';
import {Vector2Utils} from '../utils/Vector2Utils';
import {getDeltaBehavior} from './base-behaviors/delta-behavior/DeltaBehavior';
import {isDeltaBehaviorConfig} from './base-behaviors/delta-behavior/DeltaBehavior.typeguards';
import {getScalarBehavior} from './base-behaviors/scalar-behavior/ScalarBehavior';
import {isScalarBehaviorConfig} from './base-behaviors/scalar-behavior/ScalarBehavior.typeguards';
import {getScriptBehavior} from './base-behaviors/script-behavior/ScriptBehavior';
import {isScriptBehaviorConfig} from './base-behaviors/script-behavior/ScriptBehavior.typeguards';
import {getVectorBehavior} from './base-behaviors/vector-behavior/VectorBehavior';
import {isVectorBehaviorConfig} from './base-behaviors/vector-behavior/VectorBehavior.typeguards';
import {
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
} from './behaviors/color-behavior/ColorBehavior.typeguards';
import {getColorDynamicBehavior} from './behaviors/color-behavior/ColorDynamicBehavior/ColorDynamicBehavior';
import {getColorStaticBehavior} from './behaviors/color-behavior/ColorStaticBehavior/ColorStaticBehavior';
import {getLifeTimeBehavior} from './behaviors/life-time-behavior/LifeTimeBehavior';
import {getDirection} from './direction/getDirection';
import {getSpawnPosition} from './spawn-shapes/getSpawnPosition';

export interface ExperimentalViewParticle extends ViewParticle {
  onRender: VoidFunction;
  destroy(): void;
}

export type ExperimentalViewRenderFn = () => ExperimentalViewParticle;

export interface ExperimentalViewContainer extends ViewContainer<ExperimentalViewParticle> {
  children: ExperimentalViewParticle[];
}

function isDead(lifeTimeNormalizedProgress: number): boolean {
  return lifeTimeNormalizedProgress === 1;
}

export class ExperimentalParticleFlux {
  public readonly emitter: ParticleEmitter;
  public readonly container: IParticleContainer;
  public readonly config: ConfigManager;

  constructor(
    private readonly viewContainer: ExperimentalViewContainer,
    private readonly viewFactory: ExperimentalViewRenderFn[] | ExperimentalViewRenderFn,
    private readonly initialConfig: ParticleFluxConfig,
  ) {
    this.config = new ConfigManager(this.initialConfig, this.viewFactory);

    const ticker = Ticker.getInstance();

    this.container = {
      addParticle: (): void => {
        const config = this.config.particleConfig;

        const p: ExperimentalViewParticle = Array.isArray(viewFactory)
          ? realRandom.choice(viewFactory)()
          : viewFactory();

        p.constructor.prototype.speed = 0;

        p.constructor.prototype.lifeTimeBehavior = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);

        p.constructor.prototype.deltaPath = {x: 0, y: 0};

        p.constructor.prototype.initialPosition = config.spawnShape
          ? getSpawnPosition(config.spawnShape, config.spawnPosition)
          : config.spawnPosition || {x: 0, y: 0};

        //@ts-ignore
        p.position = {...p.initialPosition};

        if (config.direction) {
          p.constructor.prototype.direction = getDirection(config.direction);
        } else {
          p.constructor.prototype.direction = {
            x: 0,
            y: 0,
          };
        }

        if (config.speed) {
          if (isScriptBehaviorConfig(config.speed)) {
            p.constructor.prototype.speedBehavior = getScriptBehavior(config.speed);
          } else if (isScalarBehaviorConfig(config.speed)) {
            p.constructor.prototype.speedBehavior = getScalarBehavior(config.speed);
          }
        }

        if (config.alpha) {
          if (isScriptBehaviorConfig(config.alpha)) {
            p.constructor.prototype.alphaBehavior = getScriptBehavior(config.alpha);
          } else if (isScalarBehaviorConfig(config.alpha)) {
            p.constructor.prototype.alphaBehavior = getScalarBehavior(config.alpha);
          }
        }

        if (config.rotation) {
          if (isDeltaBehaviorConfig(config.rotation)) {
            p.constructor.prototype.rotationBehavior = getDeltaBehavior(config.rotation);
          } else if (isScalarBehaviorConfig(config.rotation)) {
            p.constructor.prototype.rotationBehavior = getScalarBehavior(config.rotation);
          } else if (isScriptBehaviorConfig(config.rotation)) {
            p.constructor.prototype.rotationBehavior = getScriptBehavior(config.rotation);
          }
        }

        if (config.scale) {
          if (isScalarBehaviorConfig(config.scale)) {
            p.constructor.prototype.scaleBehavior = (
              lifeTimeNormalizedProgress: number,
              elapsedDelta: number,
            ): Point2d => {
              // @ts-ignore
              const value = getScalarBehavior(config.scale)(lifeTimeNormalizedProgress, elapsedDelta);

              return {
                x: value,
                y: value,
              };
            };
          } else if (isScriptBehaviorConfig(config.scale)) {
            p.constructor.prototype.scaleBehavior = (
              lifeTimeNormalizedProgress: number,
              elapsedDelta: number,
            ): Point2d => {
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
            p.constructor.prototype.scaleBehavior = getVectorBehavior(config.scale);
          }
        }

        if (config.color) {
          if (isColorScriptBehaviorConfig(config.color)) {
            p.constructor.prototype.colorBehavior = getScriptBehavior(config.color);
          } else if (isColorStaticBehaviorConfig(config.color)) {
            p.constructor.prototype.colorBehavior = getColorStaticBehavior(config.color);
          } else if (isColorDynamicBehaviorConfig(config.color)) {
            p.constructor.prototype.colorBehavior = getColorDynamicBehavior(config.color);
          }
        }

        if (config.gravity) {
          p.constructor.prototype.gravityBehavior = getScalarBehavior(config.gravity);
        }

        // todo error
        p.constructor.prototype.pathFunc = this.config.path ? parsePath(this.config.path.path) : undefined;

        p.onRender = () => {
          const deltaMS = ticker.deltaMS;
          const elapsedDelta = ticker.elapsedDelta;

          // @ts-ignore
          const lifeTimeNormalizedProgress = p.lifeTimeBehavior(deltaMS);
          if (isDead(lifeTimeNormalizedProgress)) {
            p.destroy();
            return;
          }

          // @ts-ignore
          if (p.speedBehavior) {
            // @ts-ignore
            p.speed = p.speedBehavior(lifeTimeNormalizedProgress, elapsedDelta);
          }

          // @ts-ignore
          if (p.alphaBehavior) {
            // @ts-ignore
            p.alpha = p.alphaBehavior(lifeTimeNormalizedProgress, elapsedDelta);
          }

          // @ts-ignore
          if (p.rotationBehavior) {
            // @ts-ignore
            p.angle = p.rotationBehavior(lifeTimeNormalizedProgress, elapsedDelta);
          }

          // @ts-ignore
          if (p.scaleBehavior) {
            // @ts-ignore
            p.scale = p.scaleBehavior(lifeTimeNormalizedProgress, elapsedDelta);
          }

          // @ts-ignore
          if (p.colorBehavior) {
            // @ts-ignore
            p.tint = p.colorBehavior(lifeTimeNormalizedProgress, elapsedDelta);
          }

          // @ts-ignore
          const speed = p.speed * elapsedDelta;

          // @ts-ignore
          if (p.pathFunc) {
            // @ts-ignore
            p.deltaPath.x = p.deltaPath.x + speed;
            // @ts-ignore
            p.deltaPath.y = p.pathFunc(p.deltaPath.x);
            // @ts-ignore
            const delta = Vector2Utils.rotate(p.deltaPath, -Math.PI / 2);

            p.position = {
              // @ts-ignore
              x: NumberUtils.roundWith2Precision(p.initialPosition.x + delta.x),
              // @ts-ignore
              y: NumberUtils.roundWith2Precision(p.initialPosition.y + delta.y),
            };
          } else {
            // todo наверное лучше накопление
            // @ts-ignore
            const gravityShift = p.gravityBehavior
              ? // @ts-ignore
                p.gravityBehavior(lifeTimeNormalizedProgress, elapsedDelta)
              : 0;

            // @ts-ignore
            p.position = {
              // @ts-ignore
              x: NumberUtils.roundWith2Precision(p.position.x + p.direction.x * speed),
              // @ts-ignore
              y: NumberUtils.roundWith2Precision(p.position.y + (p.direction.y + gravityShift) * speed),
            };
          }
        };

        p.onRender();

        this.viewContainer.addChild(p);
      },
      getParticlesCount: (): number => this.viewContainer.children.length,
      clear: (): void => {
        this.viewContainer.children.forEach((child) => child.destroy());
      },
      update: () => {},
      // todo fix
      //@ts-ignore
      getParticles: () => this.viewContainer.children,
    };
    this.emitter = new ParticleEmitter(this.container, this.config, ticker);
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

  // public updateContainer(elapsedDelta: number, deltaMS: number): void {
  //   this.container.update(elapsedDelta, deltaMS);
  // }

  public getParticlesCount(): number {
    return this.container.getParticlesCount();
  }

  public getParticles(): IParticle[] {
    return this.container.getParticles();
  }
}
