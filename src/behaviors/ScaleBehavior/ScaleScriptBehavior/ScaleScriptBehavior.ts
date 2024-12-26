import {ScriptBehavior} from '../../../base-behaviors/ScriptBehavior/ScriptBehavior';
import {IVector2} from '../../../types';

export class ScaleScriptBehavior extends ScriptBehavior<IVector2 | number> {
  protected updateValue(value: IVector2 | number): void {
    if (typeof value === 'number') {
      this.particle.view.scale.x = value;
      this.particle.view.scale.y = value;
    } else {
      this.particle.view.scale.x = value.x;
      this.particle.view.scale.y = value.y;
    }
  }
}
