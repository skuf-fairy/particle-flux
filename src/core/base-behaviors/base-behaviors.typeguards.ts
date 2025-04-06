import {AnyBaseBehavior, BaseBehaviorType} from './base-behaviors.types';
import {DeltaBehavior} from './delta-behavior/DeltaBehavior.types';
import {ScalarBehavior} from './scalar-behavior/ScalarBehavior.types';
import {ScriptBehavior} from './script-behavior/ScriptBehavior.types';
import {VectorBehavior} from './vector-behavior/VectorBehavior.types';

export function isScalarBehavior(behavior: AnyBaseBehavior): behavior is ScalarBehavior {
  return behavior.type === BaseBehaviorType.Scalar;
}

export function isVectorBehavior(behavior: AnyBaseBehavior): behavior is VectorBehavior {
  return behavior.type === BaseBehaviorType.Vector;
}

export function isScriptBehavior<T>(behavior: AnyBaseBehavior): behavior is ScriptBehavior<T> {
  return behavior.type === BaseBehaviorType.Script;
}

export function isDeltaBehavior(behavior: AnyBaseBehavior): behavior is DeltaBehavior {
  return behavior.type === BaseBehaviorType.Delta;
}
