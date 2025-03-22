import {DeltaBehaviorConfig} from '../../base-behaviors/delta-behavior/DeltaBehavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/ScriptBehavior.types';

export type RotationBehaviorConfig = ScalarBehaviorConfig | DeltaBehaviorConfig | ScriptBehaviorConfig<number>;
