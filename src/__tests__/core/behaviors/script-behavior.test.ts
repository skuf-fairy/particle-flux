import {describe, expect, it} from 'vitest';
import {BaseBehaviorType} from '../../../core/base-behaviors/base-behaviors.types';
import {getNumberScriptBehaviorValue} from '../../../core/base-behaviors/script-behavior/number-script-behavior/number-script-behavior';

describe('Script behavior', () => {
  it('При времени жизни 0 должен возвращаться первое значение из скрипта', () => {
    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        0,
      ),
    ).toEqual(0);
  });

  it('При времени жизни 1 должен возвращаться последнее значение из скрипта', () => {
    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        100,
      ),
    ).toEqual(1);
  });

  it('При разных значениях времени жизни должны возвращаться соответствующие значения из скрипта', () => {
    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        50,
      ),
    ).toEqual(0.5);

    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        25,
      ),
    ).toEqual(0);

    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        75,
      ),
    ).toEqual(0.5);
  });

  it('Поиск значения не с последнего примененного значения', () => {
    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 0.75, time: 75},
            {value: 0.85, time: 85},
            {value: 1, time: 100},
          ],
          lastValueIndex: 2,
          isInterpolate: false,
          type: BaseBehaviorType.Script,
        },
        90,
      ),
    ).toEqual(0.85);
  });

  it('Проверка интерполированного значения', () => {
    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 0.75, time: 75},
            {value: 0.85, time: 85},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: true,
          type: BaseBehaviorType.Script,
        },
        25,
      ),
    ).toEqual(0.25);

    expect(
      getNumberScriptBehaviorValue(
        {
          script: [
            {value: 0, time: 0},
            {value: 0.5, time: 50},
            {value: 0.75, time: 75},
            {value: 0.85, time: 85},
            {value: 1, time: 100},
          ],
          lastValueIndex: 1,
          isInterpolate: true,
          type: BaseBehaviorType.Script,
        },
        75,
      ),
    ).toEqual(0.75);
  });
});
