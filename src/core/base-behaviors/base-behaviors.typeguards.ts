import {AnyBehaviorState, BehaviorStateType} from './base-behaviors.types';
import {DeltaBehaviorState} from './delta-behavior/DeltaBehavior.types';
import {ScalarBehaviorState} from './scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorState} from './script-behavior/ScriptBehavior.types';
import {VectorBehaviorState} from './vector-behavior/VectorBehavior.types';

export function isScalarBehaviorState(state: AnyBehaviorState): state is ScalarBehaviorState {
  return state.type === BehaviorStateType.Scalar;
}

export function isVectorBehaviorState(state: AnyBehaviorState): state is VectorBehaviorState {
  return state.type === BehaviorStateType.Vector;
}

export function isScriptBehaviorState<T>(state: AnyBehaviorState): state is ScriptBehaviorState<T> {
  return state.type === BehaviorStateType.Script;
}

export function isDeltaBehaviorState(state: AnyBehaviorState): state is DeltaBehaviorState {
  return state.type === BehaviorStateType.Delta;
}
