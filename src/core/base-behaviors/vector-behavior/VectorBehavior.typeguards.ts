import {AnyBehaviorConfig} from '../base-behaviors.types';
import {VectorBehaviorConfig} from './VectorBehavior.types';

export function isVectorBehaviorConfig(config: AnyBehaviorConfig): config is VectorBehaviorConfig {
  return 'x' in config && 'y' in config;
}
