import {Multiplier, Point2d} from '../../../../types';
import {ScriptBehavior, ScriptBehaviorConfig} from '../script-behavior.types';

export interface Point2dScriptBehavior extends ScriptBehavior<Point2d> {
  multiplierX: number;
  multiplierY: number;
}

export interface Point2dScriptBehaviorConfig extends ScriptBehaviorConfig<Point2d> {
  multiplierX?: Multiplier;
  multiplierY?: Multiplier;
}
