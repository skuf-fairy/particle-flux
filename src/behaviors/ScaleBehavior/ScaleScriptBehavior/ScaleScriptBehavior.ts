import {ScriptBehavior} from '../../../base-behaviors/ScriptBehavior/ScriptBehavior';
import {Point2d} from '../../../types';

export class ScaleScriptBehavior extends ScriptBehavior<Point2d | number> {
  protected updateValue(value: Point2d | number): void {
    if (typeof value === 'number') {
      this.particle.view.scale.x = value;
      this.particle.view.scale.y = value;
    } else {
      this.particle.view.scale.x = value.x;
      this.particle.view.scale.y = value.y;
    }
  }
}
