import {DeltaBehaviorConfig} from '../../../core/base-behaviors/delta-behavior/delta-behavior.types';
import {ScriptBehaviorConfig} from '../../../core/base-behaviors/script-behavior/script-behavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';

export type GravityBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number> | DeltaBehaviorConfig;
