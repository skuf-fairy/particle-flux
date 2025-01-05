import {DeltaBehaviorConfig} from '../../base-behaviors/DeltaBehavior/DeltaBehavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';

export type RotationBehaviorConfig = ScalarBehaviorConfig | DeltaBehaviorConfig | ScriptBehaviorConfig<number>;
