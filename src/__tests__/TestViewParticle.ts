import {Point2d, ViewParticle} from '../types';

export class TestViewParticle implements ViewParticle {
  x: number = 0;
  y: number = 0;
  scale: Point2d = {x: 1, y: 1};
  alpha: number = 1;
  tint: string | number = 0xffffff;
  angle: number = 0;
  destroyed: boolean = false;
  visible: boolean = true;
  width: number = 1;
  height: number = 1;
}
