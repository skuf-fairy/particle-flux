import {
  EmitterConfig,
  NumberValue,
  ParticleConfig,
  ParticleEmitterConfig,
  ViewFactory,
  ViewParticle,
  ViewRenderFn,
} from '../types';
import {LifeTimeBehaviorConfig} from './behaviors/life-time-behavior/life-time-behavior.types';
import {SpeedBehaviorConfig} from './behaviors/speed-behavior/speed-behavior.types';
import {DirectionConfig} from './direction/direction.types';
import {AlphaBehaviorConfig} from './behaviors/alpha-behavior/alpha-behavior.types';
import {ScaleBehaviorConfig} from './behaviors/scale-behavior/scale-behavior.types';
import {GravityBehaviorConfig} from './behaviors/gravity-behavior/gravity-behavior.types';
import {RotationBehaviorConfig} from './behaviors/rotation-behavior/rotation-behavior.types';
import {SpawnPositionConfig} from './spawn-position/spawn-position.types';
import {SpawnShapeBehavior} from './spawn-shapes/spawn-shapes.types';
import {ColorBehaviorConfig} from './behaviors/color-behavior/color-behavior.types';
import {cloneDeep} from '../utils/cloneDeep';
import {DEFAULT_DIRECTION_CONFIG, DEFAULT_LIFE_TIME_CONFIG, DEFAULT_SPAWN_POSITION} from '../constants';
import {PathConfig} from './path/path.types';
import {EventEmitter} from '../utils/EventEmitter';

export class ConfigManager<View extends ViewParticle> {
  private config: ParticleEmitterConfig;
  private eventEmitter: EventEmitter;

  constructor(initialConfig: ParticleEmitterConfig, private viewFactory: ViewFactory<View>) {
    this.config = cloneDeep(initialConfig);
    this.eventEmitter = new EventEmitter();
  }

  set fullConfig(config: ParticleEmitterConfig) {
    this.config = cloneDeep(config);
  }

  get fullConfig(): ParticleEmitterConfig {
    return cloneDeep(this.config);
  }

  set emitterConfig(config: EmitterConfig) {
    this.config.emitterConfig = cloneDeep(config);
  }

  get emitterConfig(): EmitterConfig {
    return cloneDeep(this.config.emitterConfig);
  }

  set particleConfig(config: ParticleConfig) {
    this.config.particleConfig = cloneDeep(config);
  }

  get particleConfig(): ParticleConfig {
    return cloneDeep(this.config.particleConfig);
  }

  get view(): ViewRenderFn<View>[] | ViewRenderFn<View> {
    return this.viewFactory;
  }

  set view(viewFactory: ViewRenderFn<View>[] | ViewRenderFn<View>) {
    this.viewFactory = viewFactory;
    this.eventEmitter.emit('viewChanged', viewFactory);
  }

  // emitter config
  set spawnInterval(interval: NumberValue | undefined) {
    this.config.emitterConfig.spawnInterval = interval;
  }

  get spawnInterval(): NumberValue | undefined {
    return this.config.emitterConfig.spawnInterval;
  }

  set spawnTime(time: number | undefined) {
    this.config.emitterConfig.spawnTime = time;
  }

  get spawnTime(): number | undefined {
    return this.config.emitterConfig.spawnTime;
  }

  set spawnTimeout(time: number) {
    this.config.emitterConfig.spawnTimeout = time;
  }

  get spawnTimeout(): number | undefined {
    return this.config.emitterConfig.spawnTimeout;
  }

  set spawnParticlesPerWave(count: number | undefined) {
    this.config.emitterConfig.spawnParticlesPerWave = count;
  }

  get spawnParticlesPerWave(): number | undefined {
    return this.config.emitterConfig.spawnParticlesPerWave;
  }

  set maxParticles(count: number | undefined) {
    this.config.emitterConfig.maxParticles = count;
  }

  get maxParticles(): number | undefined {
    return this.config.emitterConfig.maxParticles;
  }

  set spawnChance(chance: number | undefined) {
    this.config.emitterConfig.spawnChance = chance;
  }

  get spawnChance(): number | undefined {
    return this.config.emitterConfig.spawnChance;
  }

  get autoStart(): boolean | undefined {
    return this.config.emitterConfig.autoStart;
  }

  // particles behavior
  set lifeTime(config: LifeTimeBehaviorConfig | undefined) {
    if (config !== undefined) {
      this.config.particleConfig.lifeTime = cloneDeep(config);
    } else {
      this.config.particleConfig.lifeTime = DEFAULT_LIFE_TIME_CONFIG;
    }
  }

  get lifeTime(): LifeTimeBehaviorConfig {
    if (this.config.particleConfig.lifeTime) {
      return this.config.particleConfig.lifeTime;
    } else {
      return DEFAULT_LIFE_TIME_CONFIG;
    }
  }

  set speed(config: SpeedBehaviorConfig | undefined) {
    this.config.particleConfig.speed = cloneDeep(config);
  }

  get speed(): SpeedBehaviorConfig | undefined {
    return this.config.particleConfig.speed;
  }

  set direction(config: DirectionConfig | undefined) {
    this.config.particleConfig.direction = cloneDeep(config || DEFAULT_DIRECTION_CONFIG);
  }

  get direction(): DirectionConfig {
    return this.config.particleConfig.direction || DEFAULT_DIRECTION_CONFIG;
  }

  set path(config: PathConfig | undefined) {
    this.config.particleConfig.path = cloneDeep(config);
  }

  get path(): PathConfig | undefined {
    return this.config.particleConfig.path;
  }

  set alpha(config: AlphaBehaviorConfig | undefined) {
    this.config.particleConfig.alpha = cloneDeep(config);
  }

  get alpha(): AlphaBehaviorConfig | undefined {
    return this.config.particleConfig.alpha;
  }

  set scale(config: ScaleBehaviorConfig | undefined) {
    this.config.particleConfig.scale = cloneDeep(config);
  }

  get scale(): ScaleBehaviorConfig | undefined {
    return this.config.particleConfig.scale;
  }

  set gravity(config: GravityBehaviorConfig | undefined) {
    this.config.particleConfig.gravity = cloneDeep(config);
  }

  get gravity(): GravityBehaviorConfig | undefined {
    return this.config.particleConfig.gravity;
  }

  set rotation(config: RotationBehaviorConfig | undefined) {
    this.config.particleConfig.rotation = cloneDeep(config);
  }

  get rotation(): RotationBehaviorConfig | undefined {
    return this.config.particleConfig.rotation;
  }

  set spawnPosition(config: SpawnPositionConfig | undefined) {
    this.config.particleConfig.spawnPosition = cloneDeep(config || DEFAULT_SPAWN_POSITION);
  }

  get spawnPosition(): SpawnPositionConfig {
    return this.config.particleConfig.spawnPosition || DEFAULT_SPAWN_POSITION;
  }

  set spawnShape(config: SpawnShapeBehavior | undefined) {
    this.config.particleConfig.spawnShape = cloneDeep(config);
  }

  get spawnShape(): SpawnShapeBehavior | undefined {
    return this.config.particleConfig.spawnShape;
  }

  set color(config: ColorBehaviorConfig | undefined) {
    this.config.particleConfig.color = cloneDeep(config);
  }

  get color(): ColorBehaviorConfig | undefined {
    return this.config.particleConfig.color;
  }

  public subscribeToViewChange(callback: () => void): void {
    this.eventEmitter.on('viewChanged', callback);
  }
}
