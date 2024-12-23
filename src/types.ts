import {ScalarBehaviorConfig} from './base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {AlphaBehaviorConfig} from './behaviors/AlphaBehavior/AlphaBehavior.types';
import {ColorBehaviorConfig} from './behaviors/ColorBehavior/ColorBehavior.types';
import {DirectionBehaviorConfig} from './behaviors/DirectionBehavior/DirectionBehavior.types';
import {GravityBehaviorConfig} from './behaviors/GravityBehavior/GravityBehavior.types';
import {LifeTimeBehaviorConfig} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
import {PathBehaviorConfig} from './behaviors/PathBehavior/PathBehavior.types';
import {RotationBehaviorConfig} from './behaviors/RotationBehavior/RotationBehavior.types';
import {ScaleBehaviorConfig} from './behaviors/ScaleBehavior/ScaleBehavior.types';
import {SpawnShape} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';
import {SpeedBehaviorConfig} from './behaviors/SpeedBehavior/SpeedBehavior.types';
import {ViewportLifeBehaviorConfig} from './behaviors/ViewportLifeBehavior/ViewportLifeBehavior.types';
import {UnknownConstructor} from './types.utils';

export interface ViewParticle {
  position: IVector2;
  scale: IVector2;
  alpha: number;
  tint: string | number;
  angle: number;
  width: number;
  height: number;
  destroyed: boolean;
}

export interface ViewContainer<U extends ViewParticle> {
  addChild(children: U): void;
  removeChild(children: U): void;
}

export interface IUpdatableEntity {
  onUpdate?(delta: number): void; // обновление в геймлупе
  onDestroy?(): void; // деструктуризация игры
  onPause?(): void; // пауза в игре
  onResume?(): void; // возобновление игры
}

export interface IParticleContainer extends IUpdatableEntity {
  addParticle(...particleList: IParticle[]): void;
  getActiveParticlesCount(): number;
  clear(): void;
}

export interface IParticleFactory {
  create(container: IParticleContainer): IParticle;
}

export interface IParticle extends IUpdatableEntity {
  addComponent(...componentList: IParticleComponent[]): void;
  removeComponent(component: UnknownConstructor<IParticleComponent>): void;
  getComponent<T extends IParticleComponent>(component: UnknownConstructor<T>): T | undefined;
  getComponentByTag<T extends IParticleComponent>(tag: string): T | undefined;
  init(): void;
  shouldDestroy: boolean;

  speed: number;
  direction: IVector2;
  view: ViewParticle;
  container: IParticleContainer;
}

export interface IParticleComponent extends IUpdatableEntity {
  tag: string;
  particle: IParticle;
  init(): void;
  bindParticle(particle: IParticle): void;
}

export interface Point2d {
  x: number;
  y: number;
}

export interface IVector2 extends Point2d {
  clone(): IVector2;
  set(x: number, y: number): void;
}

export type ViewRenderFn = () => ViewParticle;

export interface ViewPort {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EmitterConfig {
  spawnTime: number;
  emitterLifeTime?: number;
  spawnParticlesPerWave?: number;
  maxParticles?: number;
  spawnChance?: number;
}

export interface ParticleLifeTimeBehaviorConfig {
  lifeTime: LifeTimeBehaviorConfig;
  speed?: SpeedBehaviorConfig;
  direction?: DirectionBehaviorConfig;
  path?: PathBehaviorConfig;
  alpha?: AlphaBehaviorConfig;
  scale?: ScaleBehaviorConfig;
  gravity?: GravityBehaviorConfig;
  rotation?: RotationBehaviorConfig;
  spawnShape?: SpawnShape;
  color?: ColorBehaviorConfig;
}

export interface ParticleViewPortBehaviorConfig {
  viewportLife: ViewportLifeBehaviorConfig;
  speed?: ScalarBehaviorConfig;
  path?: PathBehaviorConfig;
  spawnShape?: SpawnShape;
}

export type ParticleBehaviorConfig = ParticleLifeTimeBehaviorConfig | ParticleViewPortBehaviorConfig;

export type Multiplicator =
  | {
      min: number;
      max: number;
    }
  | number;
