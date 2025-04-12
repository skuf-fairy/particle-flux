import {ViewContainer, ViewParticle} from '../types';

export class TestViewContainer implements ViewContainer {
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
