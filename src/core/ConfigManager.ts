import {NumberValue, ParticleFluxConfig} from '../types';
import {LifeTimeBehaviorConfig} from '../behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
import {SpeedBehaviorConfig} from '../behaviors/SpeedBehavior/SpeedBehavior.types';
import {DirectionBehaviorConfig} from '../behaviors/DirectionBehavior/DirectionBehavior.types';
import {PathBehaviorConfig} from '../behaviors/PathBehavior/PathBehavior.types';
import {AlphaBehaviorConfig} from '../behaviors/AlphaBehavior/AlphaBehavior.types';
import {ScaleBehaviorConfig} from '../behaviors/ScaleBehavior/ScaleBehavior.types';
import {GravityBehaviorConfig} from '../behaviors/GravityBehavior/GravityBehavior.types';
import {RotationBehaviorConfig} from '../behaviors/RotationBehavior/RotationBehavior.types';
import {SpawnPositionBehaviorConfig} from '../behaviors/SpawnPositionBehavior/SpawnPositionBehavior.types';
import {SpawnShapeBehavior} from '../behaviors/SpawnBehaviors/SpawnBehaviors.types';
import {ColorBehaviorConfig} from '../behaviors/ColorBehavior/ColorBehavior.types';

export class ConfigManager {
  constructor(private readonly config: ParticleFluxConfig) {}

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
  set lifeTime(config: LifeTimeBehaviorConfig) {
    this.config.particleBehaviorsConfig.lifeTime = {...config};
  }

  get lifeTime(): LifeTimeBehaviorConfig {
    return this.config.particleBehaviorsConfig.lifeTime;
  }

  set speed(config: SpeedBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.speed = config === undefined ? undefined : {...config};
  }

  get speed(): SpeedBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.speed;
  }

  set direction(config: DirectionBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.direction = config === undefined ? undefined : {...config};
  }

  get direction(): DirectionBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.direction;
  }

  set path(config: PathBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.path = config === undefined ? undefined : {...config};
  }

  get path(): PathBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.path;
  }

  set alpha(config: AlphaBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.alpha = config === undefined ? undefined : {...config};
  }

  get alpha(): AlphaBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.alpha;
  }

  set scale(config: ScaleBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.scale = config === undefined ? undefined : {...config};
  }

  get scale(): ScaleBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.scale;
  }

  set gravity(config: GravityBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.gravity = config === undefined ? undefined : {...config};
  }

  get gravity(): GravityBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.gravity;
  }

  set rotation(config: RotationBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.rotation = config === undefined ? undefined : {...config};
  }

  get rotation(): RotationBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.rotation;
  }

  set spawnPosition(config: SpawnPositionBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.spawnPosition = config === undefined ? undefined : {...config};
  }

  get spawnPosition(): SpawnPositionBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.spawnPosition;
  }

  set spawnShape(config: SpawnShapeBehavior | undefined) {
    this.config.particleBehaviorsConfig.spawnShape = config === undefined ? undefined : {...config};
  }

  get spawnShape(): SpawnShapeBehavior | undefined {
    return this.config.particleBehaviorsConfig.spawnShape;
  }

  set color(config: ColorBehaviorConfig | undefined) {
    this.config.particleBehaviorsConfig.color = config === undefined ? undefined : {...config};
  }

  get color(): ColorBehaviorConfig | undefined {
    return this.config.particleBehaviorsConfig.color;
  }
}
