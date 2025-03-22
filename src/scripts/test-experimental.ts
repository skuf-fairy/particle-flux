import {ExperimentalParticleFlux, ExperimentalViewParticle} from '../core/ExperimentalParticleFlux';
import {Point2d, ViewContainer} from '../types';

class TestViewParticle implements ExperimentalViewParticle {
  position: Point2d = {x: 0, y: 0};
  scale: Point2d = {x: 1, y: 1};
  alpha: number = 1;
  tint: string | number = 0xffffff;
  angle: number = 0;
  width: number = 1;
  height: number = 1;
  destroyed: boolean = false;
  onRender: VoidFunction;

  destroy(): void {}
}

class TestViewContainer implements ViewContainer<ExperimentalViewParticle> {
  public children: ExperimentalViewParticle[];

  constructor() {
    this.children = [];
  }

  public addChild(children: ExperimentalViewParticle): void {
    this.children.push(children);
  }

  public removeChild(children: ExperimentalViewParticle): void {
    this.children = this.children.filter((c) => c !== children);
  }

  public update(): void {
    console.log(this.children[0]);
    this.children.forEach((child) => child.onRender());
  }
}

const container = new TestViewContainer();

const particleFlux = new ExperimentalParticleFlux(container, () => new TestViewParticle(), {
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

particleFlux.emitOnce(1);

container.update();
container.update();
container.update();

console.log(container);
