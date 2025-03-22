import {ParticleFlux} from '../core/ParticleFlux';
import {Point2d, ViewContainer, ViewParticle} from '../types';

class TestViewParticle implements ViewParticle {
  position: Point2d = {x: 0, y: 0};
  scale: Point2d = {x: 1, y: 1};
  alpha: number = 1;
  tint: string | number = 0xffffff;
  angle: number = 0;
  width: number = 1;
  height: number = 1;
  destroyed: boolean = false;
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

const particleFlux = new ParticleFlux(new TestViewContainer(), () => new TestViewParticle(), {
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
    alpha: {
      value: 0.5,
    },
  },
});

particleFlux.emitOnce(50000);

const startTime = performance.now();

particleFlux.updateContainer(1, 16.6);

console.log(performance.now() - startTime);
