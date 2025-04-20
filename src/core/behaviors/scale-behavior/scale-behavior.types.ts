import {Point2dScriptBehavior} from '../../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior.types';
import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';
import {NumberScriptBehaviorConfig} from '../../base-behaviors/script-behavior/number-script-behavior/number-script-behavior.types';
import {VectorBehaviorConfig} from '../../base-behaviors/vector-behavior/vector-behavior.types';

export type ScaleBehaviorConfig =
  | ScalarBehaviorConfig
  | NumberScriptBehaviorConfig
  | Point2dScriptBehavior
  | VectorBehaviorConfig;
