import {BaseBehaviorType} from '../../../core/base-behaviors/base-behaviors.types';
import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../../constants';
import {createUnusedParticle} from '../../../core/particle/createUnusedParticle';
import {createView} from '../../../core/particle/createView';
import {updateParticle} from '../../../core/particle/updateParticle';
import {useParticle} from '../../../core/particle/useParticle';
import {ParticleConfig} from '../../../types';
import {STANDARD_DELTA_MS} from '../../../utils/Ticker';
import {TestViewContainer} from '../../TestViewContainer';

describe('Обновление поворота отображения', () => {
  const particleConfig: ParticleConfig = {
    lifeTime: {
      value: 10,
    },
    direction: {
      angle: 90,
    },
    rotation: {
      value: 0,
      delta: 1,
    },
  };
  const viewContainer = new TestViewContainer();
  const view = createView(TEST_VIEW_FACTORY);

  const particle = createUnusedParticle(viewContainer, view);
  useParticle(particle, particleConfig);

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
