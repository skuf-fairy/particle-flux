export function getProgressBetweenScriptItems(
  lifeTimeNormalizedProgress: number,
  prevScriptItemTime: number,
  currentScriptItemTime: number,
) {
  const delta = currentScriptItemTime - prevScriptItemTime;
  return (lifeTimeNormalizedProgress - prevScriptItemTime) / (delta || 1);
}
