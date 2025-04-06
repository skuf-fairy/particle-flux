import {DeltaBehavior} from './delta-behavior/DeltaBehavior.types';
import {ScalarBehaviorConfig, ScalarBehavior} from './scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig, ScriptBehavior} from './script-behavior/ScriptBehavior.types';
import {VectorBehaviorConfig, VectorBehavior} from './vector-behavior/VectorBehavior.types';

export type AnyBaseBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;

export type AnyBaseBehavior = ScalarBehavior | VectorBehavior | ScriptBehavior<any> | DeltaBehavior;

export enum BaseBehaviorType {
  Scalar = 'Scalar',
  Vector = 'Vector',
  Script = 'Script',
  Delta = 'Delta',
}
