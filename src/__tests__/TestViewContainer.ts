import {PixiViewContainer, ViewParticle} from '../types';

export class TestViewContainer implements PixiViewContainer<ViewParticle> {
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
