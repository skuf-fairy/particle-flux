import {ScalarBehaviorConfig} from '../../base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';

export type AlphaBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number>;
