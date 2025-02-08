import {describe, expect, it} from 'vitest';
import {ParticleBehaviorFactory} from '../../core/ParticleBehaviorFactory';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {ConfigManager} from '../../core/ConfigManager';
import {ScaleScalarBehavior} from '../../behaviors/ScaleBehavior/ScaleScalarBehavior/ScaleScalarBehavior';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {ColorScriptBehavior} from '../../behaviors/ColorBehavior/ColorScriptBehavior/ColorScriptBehavior';
import {SpawnRectangleBehavior} from '../../behaviors/SpawnBehaviors/SpawnRectangleBehavior';
import {AlphaScalarBehavior} from '../../behaviors/AlphaBehavior/AlphaScalarBehavior/AlphaScalarBehavior';

describe('ParticleBehaviorFactory', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const container = new TestViewContainer();

  it('The particle was created with the right set of behaviors', () => {
    const factory = new ParticleBehaviorFactory(container, configManager);

    const particle = factory.create();

    expect(particle.getComponent(ScaleScalarBehavior)).instanceOf(ScaleScalarBehavior);
    expect(particle.getComponent(LifeTimeBehavior)).instanceOf(LifeTimeBehavior);
    expect(particle.getComponent(ColorScriptBehavior)).instanceOf(ColorScriptBehavior);
    expect(particle.getComponent(AlphaScalarBehavior)).instanceOf(AlphaScalarBehavior);
    expect(particle.getComponent(SpawnRectangleBehavior)).instanceOf(SpawnRectangleBehavior);
  });
});
