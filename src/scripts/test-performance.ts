import {ViewParticle, Point2d, ViewContainer} from '../types';
import {ParticleEmitter} from '../core/ParticleEmitter';
import {measureFuncExecuteTime} from './measureFuncExecuteTime';

class TestViewParticle implements ViewParticle {
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

class TestViewContainer implements ViewContainer<ViewParticle> {
  public children: ViewParticle[];

  constructor() {
    this.children = [];
  }

  public addChild(children: ViewParticle): void {
    this.children.push(children);
  }

  public removeChild(children: ViewParticle): void {
    this.children = this.children.filter((c) => c !== children);
  }
}

export function testParticleFluxPerformance() {
  const emitter = new ParticleEmitter(new TestViewContainer(), () => new TestViewParticle(), {
    emitterConfig: {
      autoStart: false,
    },
    particleConfig: {
      lifeTime: {
        value: 600000,
      },
      speed: {
        value: 1,
      },
      direction: {
        minAngle: 0,
        maxAngle: 360,
      },
      // alpha: {
      //   value: 0.5,
      // },
    },
  });

  emitter.emitOnce(100000);

  return () => emitter.updateContainer(1, 1000 / 60);
}

console.log(measureFuncExecuteTime(testParticleFluxPerformance(), 200));
