import {DeltaBehaviorState} from './delta-behavior/DeltaBehavior.types';
import {ScalarBehaviorConfig, ScalarBehaviorState} from './scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig, ScriptBehaviorState} from './script-behavior/ScriptBehavior.types';
import {VectorBehaviorConfig, VectorBehaviorState} from './vector-behavior/VectorBehavior.types';

export type AnyBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;

export type AnyBehaviorState =
  | ScalarBehaviorState
  | VectorBehaviorState
  | ScriptBehaviorState<any>
  | DeltaBehaviorState;

export enum BehaviorStateType {
  Scalar = 'Scalar',
  Vector = 'Vector',
  Script = 'Script',
  Delta = 'Delta',
}
