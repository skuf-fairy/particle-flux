import {ScriptBehavior} from '../../../base-behaviors/ScriptBehavior/ScriptBehavior';
import {IVector2} from '../../../types';

export class ScaleScriptBehavior extends ScriptBehavior<IVector2 | number> {
  protected updateValue(value: IVector2 | number): void {
    if (typeof value === 'number') {
      this.particle.view.scale.set(value, value);
    } else {
      this.particle.view.scale.set(value.x, value.y);
    }
  }
}
