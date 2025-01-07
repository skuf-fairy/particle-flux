import {Point2d, ViewParticle} from '../types';

export class TestViewParticle implements ViewParticle {
  position: Point2d = {x: 0, y: 0};
  scale: Point2d = {x: 1, y: 1};
  alpha: number = 1;
  tint: string | number = 0xffffff;
  angle: number = 0;
  width: number = 1;
  height: number = 1;
  destroyed: boolean = false;
}
