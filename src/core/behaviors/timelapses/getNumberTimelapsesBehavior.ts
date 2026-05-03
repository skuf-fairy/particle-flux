import {getRandomValue} from '../../../utils/getRandomValue';
import {START_SCRIPT_TIME, END_SCRIPT_TIME} from './timelapses.constants';
import {NumberTimelapsesConfig, TimelapsesBehavior} from './timelapses.types';

export function getNumberTimelapsesBehavior(config: NumberTimelapsesConfig): TimelapsesBehavior<number> {
  if (config.timelapses.length === 0) {
    throw new Error('Скрипт должен содержать хотя бы 1 элемент');
  }

  if (config.timelapses.some((item) => item.time < START_SCRIPT_TIME || item.time > END_SCRIPT_TIME)) {
    throw new Error('Значения времени в скрипте должны быть от 0 до 100');
  }

  const multiplier = config.randomRange ? getRandomValue(config.randomRange) : 1;

  const timelapses = config.timelapses
    .sort((a, b) => a.time - b.time)
    .map((item) => ({time: item.time / END_SCRIPT_TIME, value: item.value * multiplier}));

  return {
    timelapses,
    index: 1,
  };
}
