import {ParticleContainer} from './ParticleContainer';
import {IParticle, ViewParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {updateParticle} from './particle/updateParticle';
import {ShapePointGenerator} from './spawn-shapes/ShapePointGenerator';
import {MAX_SPAWN_CHANCE, MIN_SPAWN_CHANCE} from '../constants';
import {realRandom} from '../utils/random/Random';

export class ParticleSpawner<View extends ViewParticle = ViewParticle> {
  constructor(
    private readonly configManager: ConfigManager<View>,
    private readonly container: ParticleContainer<View>,
    private readonly shapePointGenerator: ShapePointGenerator,
  ) {
    this.configManager = configManager;
    this.shapePointGenerator = shapePointGenerator;
    this.container = container;
  }

  /**
   * создает указанное количество частиц с вероятностью spawnChance, но не более чем maxParticles
   * @param particlesCount number of particles
   */
  public emitOnce(particlesCount: number = 1): void {
    const count = this.getAvailableForEmitParticlesCount(particlesCount);

    for (let i = 0; i < count; i++) {
      // создание через emitOnce не считается за создание волны
      this.emit(0);
    }
  }

  /**
   * Создает волну частиц
   */
  public emitWave(): void {
    this.createParticleWave(0, 0);
  }

  // cleaning the container
  public clean(): void {
    this.container.clearActiveParticles();
  }

  public updateContainer(elapsedDelta: number, deltaMS: number): void {
    this.container.update(elapsedDelta, deltaMS);
  }

  // pastTime - временной отрезок, на котором могли бы создаться частицы
  // возвращает количество волн, которое удалось создать
  public createParticlesBetweenFrames(spawnInterval: number, pastTime: number): number {
    // сколько раз могли бы заспавниться частицы за прошедшее время между кадрами
    const spawnParticlesWaveCount = Math.floor(pastTime / spawnInterval) + 1;

    for (let i = 0; i < spawnParticlesWaveCount; i++) {
      // pastTime - i * spawnInterval - возраст, который успели прожить частицы
      this.createParticleWave(pastTime - i * spawnInterval, pastTime);
    }

    return spawnParticlesWaveCount;
  }

  public createParticleWave(particleAge: number, timeInterval: number): void {
    const countPerWave = this.configManager.spawnParticlesPerWave || 1;
    const count = this.getAvailableForEmitParticlesCount(countPerWave);

    for (let i = 0; i < count; i++) {
      // для группировки волн, сбрасываем генератор точек, чтобы он вернул ту же самую позицию, что и в прошлый раз
      if (this.configManager.spawnShape?.isGroupWave) {
        this.shapePointGenerator.reset();
      }

      const particle = this.emit(i);
      if (particle && particleAge > 0) {
        updateParticle(particle, particleAge / (timeInterval || 1), particleAge);
      }
    }

    this.shapePointGenerator.refresh();
  }

  // creates a particle with a transferred chance of creation
  private emit(waveParticleIndex: number): IParticle<View> | undefined {
    if (
      this.configManager.spawnChance !== undefined &&
      realRandom.randomInt(MIN_SPAWN_CHANCE, MAX_SPAWN_CHANCE) >= this.configManager.spawnChance
    ) {
      return;
    }

    return this.container.createParticle(waveParticleIndex);
  }

  private getAvailableForEmitParticlesCount(emitParticlesCount: number): number {
    const particlesInContainer = this.container.getParticlesCount();
    const maxParticles = this.configManager.maxParticles;

    return !maxParticles
      ? emitParticlesCount
      : Math.min(Math.max(0, maxParticles - particlesInContainer), emitParticlesCount);
  }
}
