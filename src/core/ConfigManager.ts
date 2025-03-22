import {EmitterConfig, NumberValue, ParticleConfig, ParticleFluxConfig, ViewRenderFn} from '../types';
import {LifeTimeBehaviorConfig} from './behaviors/life-time-behavior/LifeTimeBehavior.types';
import {SpeedBehaviorConfig} from './behaviors/speed-behavior/SpeedBehavior.types';
import {DirectionConfig} from './direction/direction.types';
import {AlphaBehaviorConfig} from './behaviors/alpha-behavior/AlphaBehavior.types';
import {ScaleBehaviorConfig} from './behaviors/scale-behavior/ScaleBehavior.types';
import {GravityBehaviorConfig} from './behaviors/gravity-behavior/GravityBehavior.types';
import {RotationBehaviorConfig} from './behaviors/rotation-behavior/RotationBehavior.types';
import {SpawnPositionConfig} from './spawn-position/spawn-position.types';
import {SpawnShapeBehavior} from './spawn-shapes/spawn-shapes.types';
import {ColorBehaviorConfig} from './behaviors/color-behavior/ColorBehavior.types';
import {cloneDeep} from '../utils/cloneDeep';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';
import {PathConfig} from './path/path.types';

export class ConfigManager {
  private readonly config: ParticleFluxConfig;

  constructor(initialConfig: ParticleFluxConfig, private viewFactory: ViewRenderFn[] | ViewRenderFn) {
    this.config = cloneDeep(initialConfig);
  }

  get emitterConfig(): EmitterConfig {
    return cloneDeep(this.config.emitterConfig);
  }

  get particleConfig(): ParticleConfig {
    return cloneDeep(this.config.particleBehaviorsConfig);
  }

  get view(): ViewRenderFn[] | ViewRenderFn {
    return this.viewFactory;
  }

  set view(viewFactory: ViewRenderFn[] | ViewRenderFn) {
    this.viewFactory = viewFactory;
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
      this.config.particleBehaviorsConfig.lifeTime = cloneDeep(config);
    } else {
      this.config.particleBehaviorsConfig.lifeTime = DEFAULT_LIFE_TIME_CONFIG;
    }
  }

  get lifeTime(): LifeTimeBehaviorConfig {
    if (this.config.particleBehaviorsConfig.lifeTime) {
      return this.config.particleBehaviorsConfig.lifeTime;
    } else {
      return DEFAULT_LIFE_TIME_CONFIG;
    }
  }

  set speed(config: SpeedBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.speed = config === undefined ? undefined : cloneDeep(config);
  }

  get speed(): SpeedBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.speed;
  }

  set direction(config: DirectionConfig | undefined) {
    this.config.particleBehaviorsConfig.direction = config === undefined ? undefined : cloneDeep(config);
  }

  get direction(): DirectionConfig | undefined {
    return this.config.particleBehaviorsConfig.direction;
  }

  set path(config: PathConfig | undefined) {
    this.config.particleBehaviorsConfig.path = config === undefined ? undefined : cloneDeep(config);
  }

  get path(): PathConfig | undefined {
    return this.config.particleBehaviorsConfig.path;
  }

  set alpha(config: AlphaBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.alpha = config === undefined ? undefined : cloneDeep(config);
  }

  get alpha(): AlphaBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.alpha;
  }

  set scale(config: ScaleBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.scale = config === undefined ? undefined : cloneDeep(config);
  }

  get scale(): ScaleBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.scale;
  }

  set gravity(config: GravityBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.gravity = config === undefined ? undefined : cloneDeep(config);
  }

  get gravity(): GravityBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.gravity;
  }

  set rotation(config: RotationBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.rotation = config === undefined ? undefined : cloneDeep(config);
  }

  get rotation(): RotationBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.rotation;
  }

  set spawnPosition(config: SpawnPositionConfig | undefined) {
    this.config.particleBehaviorsConfig.spawnPosition = config === undefined ? undefined : cloneDeep(config);
  }

  get spawnPosition(): SpawnPositionConfig | undefined {
    return this.config.particleBehaviorsConfig.spawnPosition;
  }

  set spawnShape(config: SpawnShapeBehavior | undefined) {
    this.config.particleBehaviorsConfig.spawnShape = config === undefined ? undefined : cloneDeep(config);
  }

  get spawnShape(): SpawnShapeBehavior | undefined {
    return this.config.particleBehaviorsConfig.spawnShape;
  }

  set color(config: ColorBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.color = config === undefined ? undefined : cloneDeep(config);
  }

  get color(): ColorBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.color;
  }
}
