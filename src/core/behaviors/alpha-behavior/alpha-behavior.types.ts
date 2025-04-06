import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/ScriptBehavior.types';

export type AlphaBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number>;
