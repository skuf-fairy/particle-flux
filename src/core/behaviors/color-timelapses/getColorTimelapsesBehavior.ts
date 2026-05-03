import {END_SCRIPT_TIME, START_SCRIPT_TIME} from '../timelapses/timelapses.constants';
import {TimelapsesBehavior, TimelapsesConfig} from '../timelapses/timelapses.types';

export function getColorTimelapsesBehavior(config: TimelapsesConfig<string>): TimelapsesBehavior<string> {
  if (config.timelapses.length === 0) {
    throw new Error('Скрипт должен содержать хотя бы 1 элемент');
  }

  if (config.timelapses.some((item) => item.time < START_SCRIPT_TIME || item.time > END_SCRIPT_TIME)) {
    throw new Error('Значения времени в скрипте должны быть от 0 до 100');
  }

  const timelapses = config.timelapses
    .sort((a, b) => a.time - b.time)
    .map((item) => ({time: item.time / END_SCRIPT_TIME, value: item.value}));

  return {
    timelapses,
    index: 1,
  };
}
