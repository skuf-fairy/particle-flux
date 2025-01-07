import {ScalarBehaviorConfig} from './ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from './ScriptBehavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from './VectorBehavior/VectorBehavior.types';

export type AnyBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;
