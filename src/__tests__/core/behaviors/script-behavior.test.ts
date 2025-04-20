import {describe, expect, it} from 'vitest';
import {getScriptBehaviorValue} from '../../../core/base-behaviors/script-behavior/script-behavior';
import {BaseBehaviorType} from '../../../core/base-behaviors/base-behaviors.types';

describe('Script behavior', () => {
  it('При времени жизни 0 должен возвращаться первое значение из скрипта', () => {
    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 1, time: 1},
          ],
          lastValueIndex: 1,
          type: BaseBehaviorType.Script,
        },
        0,
      ),
    ).toEqual(0);
  });

  it('При времени жизни 1 должен возвращаться последнее значение из скрипта', () => {
    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 1, time: 1},
          ],
          lastValueIndex: 1,
          type: BaseBehaviorType.Script,
        },
        1,
      ),
    ).toEqual(1);
  });

  it('При разных значениях времени жизни должны возвращаться соответствующие значения из скрипта', () => {
    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          lastValueIndex: 1,
          type: BaseBehaviorType.Script,
        },
        0.5,
      ),
    ).toEqual(0.5);

    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          lastValueIndex: 1,
          type: BaseBehaviorType.Script,
        },
        0.25,
      ),
    ).toEqual(0);

    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          lastValueIndex: 1,
          type: BaseBehaviorType.Script,
        },
        0.75,
      ),
    ).toEqual(0.5);
  });

  it('Поиск значения не с последнего примененного значения', () => {
    expect(
      getScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 0.75, time: 0.75},
            {value: 0.85, time: 0.85},
            {value: 1, time: 1},
          ],
          lastValueIndex: 2,
          type: BaseBehaviorType.Script,
        },
        0.9,
      ),
    ).toEqual(0.85);
  });
});
