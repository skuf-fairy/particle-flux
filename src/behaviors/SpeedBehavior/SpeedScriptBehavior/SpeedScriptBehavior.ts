import {ScriptBehavior} from 'src/base-behaviors/ScriptBehavior/ScriptBehavior';

export class SpeedScriptBehavior extends ScriptBehavior<number> {
  protected updateValue(value: number): void {
    this.particle.speed = value;
  }
}