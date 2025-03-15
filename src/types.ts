import {AlphaBehaviorConfig} from './behaviors/AlphaBehavior/AlphaBehavior.types';
import {ColorBehaviorConfig} from './behaviors/ColorBehavior/ColorBehavior.types';
import {DirectionBehaviorConfig} from './behaviors/DirectionBehavior/DirectionBehavior.types';
import {GravityBehaviorConfig} from './behaviors/GravityBehavior/GravityBehavior.types';
import {LifeTimeBehaviorConfig} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
import {PathBehaviorConfig} from './behaviors/PathBehavior/PathBehavior.types';
import {RotationBehaviorConfig} from './behaviors/RotationBehavior/RotationBehavior.types';
import {ScaleBehaviorConfig} from './behaviors/ScaleBehavior/ScaleBehavior.types';
import {SpawnShapeBehavior} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';
import {SpawnPositionBehaviorConfig} from './behaviors/SpawnPositionBehavior/SpawnPositionBehavior.types';
import {SpeedBehaviorConfig} from './behaviors/SpeedBehavior/SpeedBehavior.types';
import {UnknownConstructor} from './types.utils';
import {TickerCallback} from './utils/Ticker';

export type GlobalWindow = Window & typeof globalThis;

// the particle parameters that are displayed on the screen
export interface ViewParticle {
  position: Point2d;
  scale: Point2d;
  alpha: number;
  tint: string | number;
  angle: number;
  width: number;
  height: number;
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

// a factory for creating particles
export interface IParticleFactory {
  create(): IParticle;
}

// particle
export interface IParticle {
  addComponent(...componentList: IParticleComponent[]): void;
  removeComponent(component: UnknownConstructor<IParticleComponent>): void;
  getComponent<T extends IParticleComponent>(component: UnknownConstructor<T>): T | undefined;
  init(): void;
  update(elapsedDelta: number, deltaMS: number): void;
  destroy(): void;
  shouldDestroy: boolean;

  speed: number;
  direction: Point2d;
  view: ViewParticle;
}

// the component for the particle
export interface IParticleComponent {
  particle: IParticle;
  init(): void;
  update?(elapsedDelta: number, deltaMS: number): void;
  destroy?(): void;
  bindParticle(particle: IParticle): void;
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

export interface ParticleBehaviorConfig {
  // lifetime of the particle
  lifeTime?: LifeTimeBehaviorConfig;
  // the initial position of the particle
  spawnPosition?: SpawnPositionBehaviorConfig;
  // the particle creation area
  spawnShape?: SpawnShapeBehavior;
  // does not change with time, indicates the direction of movement
  direction?: DirectionBehaviorConfig;
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
  path?: PathBehaviorConfig;
}

// full configuration for creating particles
export interface ParticleFluxConfig {
  emitterConfig: EmitterConfig;
  particleBehaviorsConfig: ParticleBehaviorConfig;
}

export type RangeValue = {
  min: number;
  max: number;
};

export type NumberValue = RangeValue | number;

export type Multiplier = NumberValue;
