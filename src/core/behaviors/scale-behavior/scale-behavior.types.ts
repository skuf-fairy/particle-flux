import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/scalar-behavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/script-behavior.types';
import {VectorBehaviorConfig} from '../../base-behaviors/vector-behavior/vector-behavior.types';
import {Point2d} from '../../../types';

export type ScaleBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<Point2d | number> | VectorBehaviorConfig;
