import {ScalarBehaviorConfig} from '../../base-behaviors/scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from '../../base-behaviors/vector-behavior/VectorBehavior.types';
import {Point2d} from '../../../types';

export type ScaleBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<Point2d | number> | VectorBehaviorConfig;
