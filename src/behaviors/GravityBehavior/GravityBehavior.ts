import {ScalarBehavior} from '../../base-behaviors/ScalarBehavior/ScalarBehavior';

// todo
export class GravityBehavior extends ScalarBehavior {
  public gravity: number;

  protected updateValue(value: number): void {
    this.gravity = value;
  }
}
