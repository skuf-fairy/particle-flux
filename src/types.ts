import {AlphaBehaviorConfig} from './core/behaviors/alpha-behavior/alpha-behavior.types';
import {ColorBehaviorConfig, ColorDynamicBehavior} from './core/behaviors/color-behavior/color-behavior.types';
import {DirectionConfig} from './core/direction/direction.types';
import {GravityBehaviorConfig} from './core/behaviors/gravity-behavior/gravity-behavior.types';
import {LifeTimeBehaviorConfig} from './core/behaviors/life-time-behavior/life-time-behavior.types';
import {RotationBehaviorConfig} from './core/behaviors/rotation-behavior/rotation-behavior.types';
import {ScaleBehaviorConfig} from './core/behaviors/scale-behavior/scale-behavior.types';
import {SpawnShapeBehavior} from './core/spawn-shapes/spawn-shapes.types';
import {SpeedBehaviorConfig} from './core/behaviors/speed-behavior/speed-behavior.types';
import {TickerCallback} from './utils/Ticker';
import {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';
import {PathConfig, PathFunction} from './core/path/path.types';
import {ScalarBehavior} from './core/base-behaviors/scalar-behavior/scalar-behavior.types';
import {VectorBehavior} from './core/base-behaviors/vector-behavior/vector-behavior.types';
import {DeltaBehavior} from './core/base-behaviors/delta-behavior/delta-behavior.types';
import {NumberScriptBehavior} from './core/base-behaviors/script-behavior/number-script-behavior/number-script-behavior.types';
import {Point2dScriptBehavior} from './core/base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior.types';
import {ColorScriptBehavior} from './core/behaviors/color-behavior/color-script-behavior/color-script-behavior.types';

export type GlobalWindow = Window & typeof globalThis;

// the particle parameters that are displayed on the screen
export interface ViewParticle {
  x: number;
  y: number;
  scale: Point2d;
  alpha: number;
  tint: string | number;
  angle: number;
  destroyed: boolean;
  visible: boolean;
  width: number;
  height: number;
}

// an external display container to which the particles are added
export interface ViewContainer<View extends ViewParticle> {
  addChild(child: View): void;
  removeChild(child: View): void;
}

export interface IParticleContainer<View extends ViewParticle> {
  createParticle(): void;
  getParticlesCount(): number;
  getParticlesArray(): IParticle<View>[];
  clear(): void;
  update(elapsedDelta: number, deltaMS: number): void;
}

export interface InitialViewState {
  scale: Point2d;
  alpha: number;
  tint: string | number;
  angle: number;
}

export interface IParticle<View extends ViewParticle> {
  view: View;
  next: IParticle<View> | null;
  prev: IParticle<View> | null;
  inUse: boolean;

  // todo may be normalized
  age: number;
  lifeTime: number;

  speed: number;
  deltaPath: Point2d;
  initialPosition: Point2d;
  directionRotation: number;
  direction: Point2d;
  isRotateByDirection: boolean;
  speedBehavior: ScalarBehavior | NumberScriptBehavior | null;
  pathFunc: PathFunction | null;
  gravityBehavior: ScalarBehavior | NumberScriptBehavior | DeltaBehavior | number;

  alphaBehavior: ScalarBehavior | NumberScriptBehavior | null;
  rotationBehavior: ScalarBehavior | DeltaBehavior | NumberScriptBehavior | null;
  scaleBehavior: ScalarBehavior | Point2dScriptBehavior | NumberScriptBehavior | VectorBehavior | null;
  colorBehavior: ColorDynamicBehavior | ColorScriptBehavior | null;

  isDestroyAfterDeath: boolean;

  initialViewState: InitialViewState;
}

export interface ITicker {
  FPS: number;
  deltaMS: number;
  elapsedDelta: number;
  started: boolean;
  start(): void;
  stop(): void;
  setCallback(cb: TickerCallback): void;
}

export interface Point2d {
  x: number;
  y: number;
}

export type ViewRenderFn<View extends ViewParticle> = () => View;
export type ViewFactory<View extends ViewParticle> = ViewRenderFn<View>[] | ViewRenderFn<View>;

export interface EmitterConfig {
  spawnInterval?: NumberValue;
  spawnTime?: number;
  spawnTimeout?: number;
  maxParticles?: number;
  spawnParticlesPerWave?: number;
  spawnChance?: number;
  autoStart?: boolean;
}

export interface ParticleConfig {
  // lifetime of the particle
  lifeTime?: LifeTimeBehaviorConfig;
  // the initial position of the particle
  spawnPosition?: SpawnPositionConfig;
  // the particle creation area
  spawnShape?: SpawnShapeBehavior;
  // does not change with time, indicates the direction of movement
  direction?: DirectionConfig;
  // parameters that change over time
  speed?: SpeedBehaviorConfig;
  // particle size
  scale?: ScaleBehaviorConfig;
  // particle transparency
  alpha?: AlphaBehaviorConfig;
  // gravity
  gravity?: GravityBehaviorConfig;
  // rotation
  rotation?: RotationBehaviorConfig;
  // color
  color?: ColorBehaviorConfig;
  // path
  path?: PathConfig;
}

// full configuration for creating particles
export interface ParticleEmitterConfig {
  emitterConfig: EmitterConfig;
  particleConfig: ParticleConfig;
}

export type RangeValue = {
  min: number;
  max: number;
};

export type NumberValue = RangeValue | number;

export type Multiplier = NumberValue;
