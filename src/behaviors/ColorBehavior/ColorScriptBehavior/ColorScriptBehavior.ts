import {ScriptBehavior} from 'src/base-behaviors/ScriptBehavior/ScriptBehavior';

export class ColorScriptBehavior extends ScriptBehavior<string> {
  protected updateValue(value: string): void {
    this.particle.view.tint = value;
  }
}
