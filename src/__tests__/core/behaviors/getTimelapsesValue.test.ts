import {describe, expect, it} from 'vitest';
import {lerp} from '../../../utils/lerp';
import {getTimelapsesValue} from '../../../core/behaviors/timelapses/getTimelapsesValue';

describe('Timelapses behavior', () => {
  it('При времени жизни 0 должен возвращаться первое значение из скрипта', () => {
    expect(
      getTimelapsesValue(
        {
          timelapses: [
            {value: 0, time: 0},
            {value: 1, time: 1},
          ],
          index: 1,
        },
        0,
        lerp,
      ),
    ).toEqual(0);
  });

  it('При времени жизни 1 должен возвращаться последнее значение из скрипта', () => {
    expect(
      getTimelapsesValue(
        {
          timelapses: [
            {value: 0, time: 0},
            {value: 1, time: 1},
          ],
          index: 1,
        },
        1,
        lerp,
      ),
    ).toEqual(1);
  });

  it('При разных значениях времени жизни должны возвращаться соответствующие значения из скрипта', () => {
    expect(
      getTimelapsesValue(
        {
          timelapses: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          index: 1,
        },
        0.5,
        lerp,
      ),
    ).toEqual(0.5);

    expect(
      getTimelapsesValue(
        {
          timelapses: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          index: 1,
        },
        0.25,
        lerp,
      ),
    ).toEqual(0.25);

    expect(
      getTimelapsesValue(
        {
          timelapses: [
            {value: 0, time: 0},
            {value: 0.5, time: 0.5},
            {value: 1, time: 1},
          ],
          index: 2,
        },
        0.75,
        lerp,
      ),
    ).toEqual(0.75);
  });
});
