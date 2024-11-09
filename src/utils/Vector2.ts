import {IVector2} from '../types';

export class Vector2 implements IVector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
