import {END_SCRIPT_TIME, START_SCRIPT_TIME} from './timelapses.constants';
import {AnyBehavior, ColorTimelapsesConfig} from './timelapses.types';

export function getColorTimelapsesBehavior(config: ColorTimelapsesConfig): AnyBehavior<string> {
  if (config.timelapses.length === 0) {
    throw new Error('Скрипт должен содержать хотя бы 1 элемент');
  }

  if (config.timelapses.some((item) => item.time < START_SCRIPT_TIME || item.time > END_SCRIPT_TIME)) {
    throw new Error('Значения времени в скрипте должны быть от 0 до 100');
  }

  if (config.timelapses.length === 1) {
    return {
      value: config.timelapses[0].value,
      isStatic: true,
    };
  }

  if (config.timelapses.length === 2) {
    return {
      min: config.timelapses[0].value,
      max: config.timelapses[1].value,
      easing: config.easing || 'linear',
      isTransition: true,
    };
  }

  const timelapses = config.timelapses
    .sort((a, b) => a.time - b.time)
    .map((item) => ({time: item.time / END_SCRIPT_TIME, value: item.value}));

  return {
    timelapses,
    index: 1,
  };
}
