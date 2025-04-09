import {DeltaBehaviorConfig} from '../../base-behaviors/delta-behavior/delta-behavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/script-behavior.types';

export type RotationBehaviorConfig = ScalarBehaviorConfig | DeltaBehaviorConfig | ScriptBehaviorConfig<number>;
