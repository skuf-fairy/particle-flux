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
import {ScriptBehavior} from './core/base-behaviors/script-behavior/script-behavior.types';
import {VectorBehavior} from './core/base-behaviors/vector-behavior/vector-behavior.types';
import {DeltaBehavior} from './core/base-behaviors/delta-behavior/delta-behavior.types';

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
export interface ViewContainer<U extends ViewParticle> {
  addChild(children: U): void;
  removeChild(children: U): void;
}

export interface IParticleContainer {
  addParticle(): void;
  getParticlesCount(): number;
  getParticlesArray(): IParticle[];
  clear(): void;
  update(elapsedDelta: number, deltaMS: number): void;
}

export interface IParticle {
  view: ViewParticle;
  next: IParticle | null;
  prev: IParticle | null;
  inUse: boolean;

  // todo may be normalized
  age: number;
  lifeTime: number;

  speed: number;
  deltaPath: Point2d;
  initialPosition: Point2d;
  direction: Point2d;
  speedBehavior: ScalarBehavior | ScriptBehavior<number> | null;
  pathFunc: PathFunction | null;
  usePathFunc: boolean;
  useGravity: boolean;
  gravityBehavior: ScalarBehavior | number;

  alphaBehavior: ScalarBehavior | ScriptBehavior<number> | null;
  rotationBehavior: ScalarBehavior | DeltaBehavior | ScriptBehavior<number> | null;
  scaleBehavior: ScalarBehavior | ScriptBehavior<Point2d> | VectorBehavior | null;
  colorBehavior: ColorDynamicBehavior | ScriptBehavior<string> | null;
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

export type ViewRenderFn = () => ViewParticle;

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
