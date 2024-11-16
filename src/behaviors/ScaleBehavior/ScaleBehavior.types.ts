import {ScalarBehaviorConfig} from '../../base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from '../../base-behaviors/VectorBehavior/VectorBehavior.types';
import {IVector2} from '../../types';

export type ScaleBehaviorConfig = ScalarBehaviorConfig | ScriptBehaviorConfig<IVector2 | number> | VectorBehaviorConfig;
