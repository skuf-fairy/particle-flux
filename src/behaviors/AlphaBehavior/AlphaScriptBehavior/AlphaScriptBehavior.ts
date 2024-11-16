import {ScriptBehavior} from '../../../base-behaviors/ScriptBehavior/ScriptBehavior';

export class AlphaScriptBehavior extends ScriptBehavior<number> {
  protected updateValue(value: number): void {
    this.particle.view.alpha = value;
  }
}
