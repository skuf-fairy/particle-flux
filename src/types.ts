import {AlphaBehaviorConfig} from './core/behaviors/alpha-behavior/AlphaBehavior.types';
import {ColorBehaviorConfig, ColorDynamicBehaviorState} from './core/behaviors/color-behavior/ColorBehavior.types';
import {DirectionConfig} from './core/direction/direction.types';
import {GravityBehaviorConfig} from './core/behaviors/gravity-behavior/GravityBehavior.types';
import {LifeTimeBehaviorConfig} from './core/behaviors/life-time-behavior/LifeTimeBehavior.types';
import {RotationBehaviorConfig} from './core/behaviors/rotation-behavior/RotationBehavior.types';
import {ScaleBehaviorConfig} from './core/behaviors/scale-behavior/ScaleBehavior.types';
import {SpawnShapeBehavior} from './core/spawn-shapes/spawn-shapes.types';
import {SpeedBehaviorConfig} from './core/behaviors/speed-behavior/SpeedBehavior.types';
import {TickerCallback} from './utils/Ticker';
import {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';
import {PathConfig, PathFunction} from './core/path/path.types';
import {ScalarBehaviorState} from './core/base-behaviors/scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorState} from './core/base-behaviors/script-behavior/ScriptBehavior.types';
import {VectorBehaviorState} from './core/base-behaviors/vector-behavior/VectorBehavior.types';
import {DeltaBehaviorState} from './core/base-behaviors/delta-behavior/DeltaBehavior.types';

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
  speed: number;
  deltaPath: Point2d;
  initialPosition: Point2d;
  direction: Point2d;
  view: ViewParticle | null;
  next: IParticle | null;
  prev: IParticle | null;
  inUse: boolean;

  age: number;
  lifeTime: number;
  speedBehavior: ScalarBehaviorState | ScriptBehaviorState<number> | null;
  alphaBehavior: ScalarBehaviorState | ScriptBehaviorState<number> | null;
  rotationBehavior: ScalarBehaviorState | DeltaBehaviorState | ScriptBehaviorState<number> | null;
  scaleBehavior: ScalarBehaviorState | ScriptBehaviorState<Point2d> | VectorBehaviorState | null;
  colorBehavior: ColorDynamicBehaviorState | ScriptBehaviorState<string> | null;
  gravityBehavior: ScalarBehaviorState | number;
  pathFunc: PathFunction | null;

  usePathFunc: boolean;
  useGravity: boolean;

  viewContainer: ViewContainer<ViewParticle>;
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
export interface ParticleFullConfig {
  emitterConfig: EmitterConfig;
  particleConfig: ParticleConfig;
}

export type RangeValue = {
  min: number;
  max: number;
};

export type NumberValue = RangeValue | number;

export type Multiplier = NumberValue;
