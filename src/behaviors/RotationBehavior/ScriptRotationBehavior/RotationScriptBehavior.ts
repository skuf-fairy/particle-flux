import {ScriptBehavior} from '../../../base-behaviors/ScriptBehavior/ScriptBehavior';

export class ScriptRotationBehavior extends ScriptBehavior<number> {
  protected updateValue(value: number): void {
    this.particle.view.angle = value;
  }
}
