import {ScalarBehaviorConfig} from '../../base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';

export interface DeltaRotationConfig {
  angle: number;
  deltaAngle: number;
}

export type RotationBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number> | DeltaRotationConfig;
