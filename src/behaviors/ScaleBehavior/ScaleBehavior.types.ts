import {ScalarBehaviorConfig} from 'src/base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from 'src/base-behaviors/ScriptBehavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from 'src/base-behaviors/VectorBehavior/VectorBehavior.types';
import {IVector2} from 'src/types';

export type ScaleBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<IVector2 | number> | VectorBehaviorConfig;
