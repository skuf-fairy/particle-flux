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

// параметры частицы, которые могут обновляться
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

// внешний контейнер для отображения, в который добавляются частицы
export interface ViewContainer<U extends ViewParticle> {
  addChild(children: U): void;
  removeChild(children: U): void;
}

// базовая обновляемая сущность
export interface IUpdatableEntity {
  onUpdate?(delta: number): void; // обновление на вызове requestAnimationFrame
  onDestroy?(): void; // деструктуризация эмиттера
  onPause?(): void; // пауза обновления времени в эмиттере
  onResume?(): void; // возобновление обновления времени в эмиттере
}

export interface IParticleContainer extends IUpdatableEntity {
  addParticle(...particleList: IParticle[]): void;
  getActiveParticlesCount(): number;
  clear(): void;
}

// фабрика по созданию частиц
export interface IParticleFactory {
  create(container: IParticleContainer): IParticle;
}

// частица
export interface IParticle extends IUpdatableEntity {
  addComponent(...componentList: IParticleComponent[]): void;
  removeComponent(component: UnknownConstructor<IParticleComponent>): void;
  getComponent<T extends IParticleComponent>(component: UnknownConstructor<T>): T | undefined;
  getComponentByTag<T extends IParticleComponent>(tag: string): T | undefined;
  init(): void;
  shouldDestroy: boolean;

  speed: number;
  direction: Point2d;
  view: ViewParticle;
  container: IParticleContainer;
}

// компонент для частицы
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

export type ViewRenderFn = () => ViewParticle;

export interface EmitterConfig {
  spawnInterval?: NumberValue;
  spawnTime?: number;
  spawnParticlesPerWave?: number;
  maxParticles?: number;
  spawnChance?: number;
  autoStart?: boolean;
}

// поведение частицы, которое основано на времени жизни частицы
// то есть параметры в повдении измяняются с течением жизни частицы
export interface ParticleBehaviorConfig {
  lifeTime: LifeTimeBehaviorConfig;
  speed?: SpeedBehaviorConfig;
  direction?: DirectionBehaviorConfig;
  path?: PathBehaviorConfig;
  alpha?: AlphaBehaviorConfig;
  scale?: ScaleBehaviorConfig;
  gravity?: GravityBehaviorConfig;
  rotation?: RotationBehaviorConfig;
  spawnPosition?: SpawnPositionBehaviorConfig;
  spawnShape?: SpawnShapeBehavior;
  color?: ColorBehaviorConfig;
}

// полный конфиг для создания частиц
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
