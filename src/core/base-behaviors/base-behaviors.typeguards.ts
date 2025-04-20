import {AnyBaseBehavior, BaseBehaviorType} from './base-behaviors.types';
import {DeltaBehavior} from './delta-behavior/delta-behavior.types';
import {ScalarBehavior} from './scalar-behavior/scalar-behavior.types';
import {ScriptBehavior} from './script-behavior/script-behavior.types';
import {VectorBehavior} from './vector-behavior/vector-behavior.types';

export function isScalarBehavior(behavior: AnyBaseBehavior): behavior is ScalarBehavior {
  return behavior.type === BaseBehaviorType.Scalar;
}

export function isVectorBehavior(behavior: AnyBaseBehavior): behavior is VectorBehavior {
  return behavior.type === BaseBehaviorType.Vector;
}

export function isScriptBehavior<V>(behavior: AnyBaseBehavior): behavior is ScriptBehavior<V> {
  return behavior.type === BaseBehaviorType.Script;
}

export function isDeltaBehavior(behavior: AnyBaseBehavior): behavior is DeltaBehavior {
  return behavior.type === BaseBehaviorType.Delta;
}
