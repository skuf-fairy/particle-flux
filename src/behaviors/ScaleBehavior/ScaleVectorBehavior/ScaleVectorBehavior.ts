import {VectorBehavior} from 'src/base-behaviors/VectorBehavior/VectorBehavior';
import {IVector2} from 'src/types';

export class ScaleVectorBehavior extends VectorBehavior {
  protected updateValue(value: IVector2): void {
    this.particle.view.scale.set(value.x, value.y);
  }
}
