import {VectorBehavior} from '../../../base-behaviors/VectorBehavior/VectorBehavior';
import {IVector2} from '../../../types';

export class ScaleVectorBehavior extends VectorBehavior {
  protected updateValue(value: IVector2): void {
    this.particle.view.scale.x = value.x;
    this.particle.view.scale.y = value.y;
  }
}
