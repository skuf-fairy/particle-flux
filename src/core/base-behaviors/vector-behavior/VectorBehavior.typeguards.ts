import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {VectorBehaviorConfig} from './VectorBehavior.types';

export function isVectorBehaviorConfig(config: AnyBaseBehaviorConfig): config is VectorBehaviorConfig {
  return 'x' in config && 'y' in config;
}
