import {AlphaBehaviorConfig} from './core/behaviors/alpha-behavior/AlphaBehavior.types';
import {ColorBehaviorConfig} from './core/behaviors/color-behavior/ColorBehavior.types';
import {DirectionConfig} from './core/direction/direction.types';
import {GravityBehaviorConfig} from './core/behaviors/gravity-behavior/GravityBehavior.types';
import {LifeTimeBehaviorConfig} from './core/behaviors/life-time-behavior/LifeTimeBehavior.types';
import {RotationBehaviorConfig} from './core/behaviors/rotation-behavior/RotationBehavior.types';
import {ScaleBehaviorConfig} from './core/behaviors/scale-behavior/ScaleBehavior.types';
import {SpawnShapeBehavior} from './core/spawn-shapes/spawn-shapes.types';
import {SpeedBehaviorConfig} from './core/behaviors/speed-behavior/SpeedBehavior.types';
import {TickerCallback} from './utils/Ticker';
import {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';
import {PathConfig} from './core/path/path.types';

export type GlobalWindow = Window & typeof globalThis;

// the particle parameters that are displayed on the screen
export interface ViewParticle {
  position: Point2d;
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
  addParticle(...particleList: IParticle[]): IParticle;
  getParticlesCount(): number;
  clear(): void;
  update(elapsedDelta: number, deltaMS: number): void;
}

// particle
export interface IParticle {
  update(elapsedDelta: number, deltaMS: number): void;
  destroy(): void;
  shouldDestroy: boolean;
  next: IParticle | null;

  speed: number;
  direction: Point2d;
  view: ViewParticle;
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
export interface ParticleFluxConfig {
  emitterConfig: EmitterConfig;
  particleBehaviorsConfig: ParticleConfig;
}

export type RangeValue = {
  min: number;
  max: number;
};

export type NumberValue = RangeValue | number;

export type Multiplier = NumberValue;
