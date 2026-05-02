import {describe, expect, it} from 'vitest';
import {ParticleSpawner} from '../../core/ParticleSpawner';
import {ConfigManager} from '../../core/ConfigManager';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ShapePointGenerator} from '../../core/spawn-shapes/ShapePointGenerator';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TestViewContainer} from '../TestViewContainer';

describe('ParticleSpawner', () => {
  it('Создание заданного количества частиц через emitOnce, но не больше maxParticles', () => {
    const initialConfig = TEST_CONFIG();
    initialConfig.emitterConfig.maxParticles = 8;
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);
    const particleSpawner = new ParticleSpawner(configManager, container, shapePointGenerator);
    particleSpawner.emitOnce(10);
    expect(container.getParticlesCount()).toBe(initialConfig.emitterConfig.maxParticles);
  });

  it('Создание волны через emitOnce, но не больше maxParticles', () => {
    const initialConfig = TEST_CONFIG();
    initialConfig.emitterConfig.maxParticles = 8;
    initialConfig.emitterConfig.spawnParticlesPerWave = 10;
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);
    const particleSpawner = new ParticleSpawner(configManager, container, shapePointGenerator);
    particleSpawner.emitWave();
    expect(container.getParticlesCount()).toBe(initialConfig.emitterConfig.maxParticles);
  });

  it('создание частиц за промежуток времени с учетом spawnInterval', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);
    const particleSpawner = new ParticleSpawner(configManager, container, shapePointGenerator);

    const particlesCreatedCount = particleSpawner.createParticlesBetweenFrames(5, 10);

    expect(particlesCreatedCount).toBe(3);
  });

  it('getAvailableForEmitParticlesCount вернет maxParticles, хотя передано больше', () => {
    const initialConfig = TEST_CONFIG();
    initialConfig.emitterConfig.maxParticles = 10;
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);
    const particleSpawner = new ParticleSpawner(configManager, container, shapePointGenerator);

    const availableCount = particleSpawner['getAvailableForEmitParticlesCount'](20);

    expect(availableCount).toBe(initialConfig.emitterConfig.maxParticles);
  });

  it('getAvailableForEmitParticlesCount вернет maxParticles, хотя передано больше', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);
    const particleSpawner = new ParticleSpawner(configManager, container, shapePointGenerator);

    const availableCount = particleSpawner['getAvailableForEmitParticlesCount'](5);
    expect(availableCount).toBe(5);
  });
});
