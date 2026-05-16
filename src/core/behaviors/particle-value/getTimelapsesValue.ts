import {lerpFunction, TimelapsesBehavior} from './timelapses.types';

export function getTimelapsesValue<T>(
  behavior: TimelapsesBehavior<T>,
  lifeTimeNormalizedProgress: number,
  lerp: lerpFunction<T>,
): T {
  const timelapses = behavior.timelapses;

  if (timelapses.length === 1) return timelapses[0].value;

  if (lifeTimeNormalizedProgress > timelapses[behavior.index].time) {
    behavior.index++;
  }

  const prevIndex = behavior.index - 1;
  const index = behavior.index;

  return lerp(
    timelapses[prevIndex].value,
    timelapses[index].value,
    getProgressBetweenTimelapsesItems(lifeTimeNormalizedProgress, timelapses[prevIndex].time, timelapses[index].time),
  );
}

function getProgressBetweenTimelapsesItems(
  lifeTimeNormalizedProgress: number,
  prevScriptItemTime: number,
  currentScriptItemTime: number,
): number {
  const delta = currentScriptItemTime - prevScriptItemTime;
  return (lifeTimeNormalizedProgress - prevScriptItemTime) / (delta || 1);
}
