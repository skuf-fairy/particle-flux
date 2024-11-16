import {VectorBehavior} from '../../../base-behaviors/VectorBehavior/VectorBehavior';
import {IVector2} from '../../../types';

export class ScaleVectorBehavior extends VectorBehavior {
  protected updateValue(value: IVector2): void {
    this.particle.view.scale.set(value.x, value.y);
  }
}
