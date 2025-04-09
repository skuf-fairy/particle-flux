import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/script-behavior.types';

export type SpeedBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<number>;
