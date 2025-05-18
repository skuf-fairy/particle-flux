import {BaseBehaviorType} from '../../../core/base-behaviors/base-behaviors.types';
import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../../constants';
import {createUnusedParticle} from '../../../core/particle/createUnusedParticle';
import {createView} from '../../../core/particle/createView';
import {updateParticle} from '../../../core/particle/updateParticle';
import {useParticle} from '../../../core/particle/useParticle';
import {ParticleEmitterConfig, ViewParticle} from '../../../types';
import {STANDARD_DELTA_MS} from '../../../utils/Ticker';
import {TestViewContainer} from '../../TestViewContainer';
import {ShapePointGenerator} from '../../../core/spawn-shapes/ShapePointGenerator';
import {ConfigManager} from '../../../core/ConfigManager';

describe('Обновление поворота отображения', () => {
  const particleConfig: ParticleEmitterConfig = {
    emitterConfig: {autoStart: false},
    particleConfig: {
      lifeTime: {
        value: 10,
      },
      direction: {
        angle: 90,
        isRotateByDirection: true,
      },
      rotation: {
        value: 0,
        delta: 1,
      },
    },
  };
  const viewContainer = new TestViewContainer();
  const view = createView(TEST_VIEW_FACTORY);

  const particle = createUnusedParticle(viewContainer, view);
  const shapePointGenerator = new ShapePointGenerator();
  useParticle(particle, new ConfigManager<ViewParticle>(particleConfig, TEST_VIEW_FACTORY), shapePointGenerator);

  updateParticle(particle, 1, STANDARD_DELTA_MS);

  it('Направление в градусах должно быть такое же, как в статичном конфиге для направления', () => {
    expect(particle.directionRotation).toEqual(90);
  });

  it('Состояние поворота должно быть DealtBehavior', () => {
    expect(particle.rotationBehavior).toEqual({
      value: 1,
      delta: 1,
      type: BaseBehaviorType.Delta,
    });
  });

  it('test', () => {
    expect(particle.view.angle).toEqual(91);
  });
});
