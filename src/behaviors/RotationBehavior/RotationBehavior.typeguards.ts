import {DeltaRotationConfig, RotationBehaviorConfig} from './RotationBehavior.types';

export function isDeltaRotationBehaviorConfig(config: RotationBehaviorConfig): config is DeltaRotationConfig {
  return 'deltaAngle' in config;
}
