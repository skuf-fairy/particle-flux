import {DeltaBehavior} from './delta-behavior/delta-behavior.types';
import {ScalarBehaviorConfig, ScalarBehavior} from './scalar-behavior/scalar-behavior.types';
import {ScriptBehaviorConfig, ScriptBehavior} from './script-behavior/script-behavior.types';
import {VectorBehaviorConfig, VectorBehavior} from './vector-behavior/vector-behavior.types';

export type AnyBaseBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;

export type AnyBaseBehavior = ScalarBehavior | VectorBehavior | ScriptBehavior<any> | DeltaBehavior;

export enum BaseBehaviorType {
  Scalar = 'Scalar',
  Vector = 'Vector',
  Script = 'Script',
  Delta = 'Delta',
}
