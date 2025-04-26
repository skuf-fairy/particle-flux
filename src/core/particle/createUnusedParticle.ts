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
      alpha: view.alpha,
      tint: view.tint,
      angle: view.angle,
    },
  };
}
