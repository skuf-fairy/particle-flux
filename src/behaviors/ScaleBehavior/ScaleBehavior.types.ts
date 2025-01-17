import {ScalarBehaviorConfig} from '../../base-behaviors/ScalarBehavior/ScalarBehavior.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from '../../base-behaviors/VectorBehavior/VectorBehavior.types';
import {Point2d} from '../../types';

export type ScaleBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<Point2d | number> | VectorBehaviorConfig;
