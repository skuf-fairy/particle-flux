import {Multiplier} from '../../../../types';
import {ScriptBehavior, ScriptBehaviorConfig} from '../script-behavior.types';

export interface NumberScriptBehavior extends ScriptBehavior<number> {
  multiplier: number;
}

export interface NumberScriptBehaviorConfig extends ScriptBehaviorConfig<number> {
  multiplier?: Multiplier;
}
