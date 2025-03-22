import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/ScriptBehavior.types';
import {EasingName} from '../../../utils/easing/easing.types';

export interface ColorDynamicBehaviorConfig {
  start: string;
  end: string;
  easing?: EasingName;
}

export interface ColorStaticBehaviorConfig {
  value: string;
}

export type ColorBehaviorConfig = ColorStaticBehaviorConfig | ColorDynamicBehaviorConfig | ScriptBehaviorConfig<string>;
