import {ColorStaticBehaviorConfig} from '../ColorBehavior.types';
import {UpdateFunction} from '../../../Particle';

export function getColorStaticBehavior(config: ColorStaticBehaviorConfig): UpdateFunction<string> {
  return () => config.value;
}
