import {ColorStaticBehaviorConfig} from '../ColorBehavior.types';
import {UpdateFunction} from '../../../../types';

export function getColorStaticBehavior(config: ColorStaticBehaviorConfig): UpdateFunction<string> {
  return () => config.value;
}
