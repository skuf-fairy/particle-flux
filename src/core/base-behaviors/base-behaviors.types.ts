import {ScalarBehaviorConfig} from './scalar-behavior/ScalarBehavior.types';
import {ScriptBehaviorConfig} from './script-behavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from './vector-behavior/VectorBehavior.types';

export type AnyBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;
