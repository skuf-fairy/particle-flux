import {DirectionConfig} from './core/behaviors/direction/direction.types';
import {LifeTimeBehaviorConfig} from './core/behaviors/life-time-behavior/life-time-behavior.types';
import {SpawnShapeBehavior} from './core/spawn-shapes/spawn-shapes.types';
import {TickerCallback} from './utils/Ticker';
import {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';
import {PathConfig, PathFunction} from './core/behaviors/path/path.types';
import {AnyBehavior, NumberTimelapsesConfig, TimelapsesConfig} from './core/behaviors/particle-value/timelapses.types';

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
  createParticle(waveParticleIndex: number): void;
  getParticlesCount(): number;
  getParticlesArray(): IParticle<View>[];
  clearActiveParticles(): void;
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
  speedBehavior: AnyBehavior<number> | null;
  pathFunc: PathFunction | null;
  gravityBehavior: AnyBehavior<number> | number;

  alphaBehavior: AnyBehavior<number> | null;
  rotationBehavior: AnyBehavior<number> | null;
  scaleBehavior: AnyBehavior<number> | null;
  colorBehavior: AnyBehavior<string> | null;

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
  spawnInterval?: number | RandomRange;
  spawnTime?: number;
  spawnTimeout?: number;
  maxParticles?: number;
  spawnParticlesPerWave?: number;
  spawnChance?: number; // значение от 0 до 100 включительно
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
  speed?: NumberTimelapsesConfig;
  // particle size
  scale?: NumberTimelapsesConfig;
  // particle transparency
  alpha?: NumberTimelapsesConfig;
  // gravity
  gravity?: NumberTimelapsesConfig;
  // rotation
  rotation?: NumberTimelapsesConfig;
  // color
  color?: TimelapsesConfig<string>;
  // path
  path?: PathConfig;
}

// full configuration for creating particles
export interface ParticleEmitterConfig {
  emitterConfig: EmitterConfig;
  particleConfig: ParticleConfig;
}

// дополнительные параметры для эмииттера
export interface ExtraOptions {
  onStartEmit?: VoidFunction;
  onStopEmit?: VoidFunction;
}

export type RandomRange = {
  min: number;
  max: number;
};
