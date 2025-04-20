import {DeltaBehaviorConfig} from '../../../core/base-behaviors/delta-behavior/delta-behavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';
import {NumberScriptBehaviorConfig} from '../../base-behaviors/script-behavior/number-script-behavior/number-script-behavior.types';

export type GravityBehaviorConfig = ScalarBehaviorConfig | NumberScriptBehaviorConfig | DeltaBehaviorConfig;
