import {ViewParticle, ViewContainer, IParticle} from '../../types';
import {getInitialParticleState} from './getInitialParticleState';

export function createUnusedParticle<View extends ViewParticle>(
  viewContainer: ViewContainer<View>,
  view: View,
): IParticle<View> {
  viewContainer.addChild(view);
  view.visible = false;

  return {
    view,
    ...getInitialParticleState(),
    initialViewState: {
      x: view.x,
      y: view.y,
      scale: view.scale,
      alpha: view.alpha,
      tint: view.tint,
      angle: view.angle,
      destroyed: false,
      visible: false,
      width: view.width,
      height: view.height,
    },
  };
}
