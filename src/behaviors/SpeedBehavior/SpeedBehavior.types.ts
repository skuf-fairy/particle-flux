import {ScalarBehaviorConfig} from 'src/base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from 'src/base-behaviors/ScriptBehavior/ScriptBehavior.types';

export type SpeedBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number>;
