import {ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from '../ScalarBehavior/ScalarBehaviorConfig.types';

export interface VectorBehaviorConfig {
  x: ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;
  y: ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;
}
