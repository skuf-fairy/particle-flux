import {VectorBehavior} from '../../../base-behaviors/VectorBehavior/VectorBehavior';
import {Point2d} from '../../../types';

export class ScaleVectorBehavior extends VectorBehavior {
  protected updateValue(value: Point2d): void {
    this.particle.view.scale.x = value.x;
    this.particle.view.scale.y = value.y;
  }
}
