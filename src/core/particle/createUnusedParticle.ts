import {ViewParticle, IParticle} from '../../types';
import {ParticleViewContainer} from '../ViewContainer';
import {getInitialParticleState} from './getInitialParticleState';

export function createUnusedParticle<View extends ViewParticle>(
  viewContainer: ParticleViewContainer<View>,
  view: View,
): IParticle<View> {
  viewContainer.add(view);
  view.visible = false;

  return {
    view,
    ...getInitialParticleState(),
    initialViewState: {
      scale: view.scale,
      alpha: view.alpha,
      tint: view.tint,
      angle: view.angle,
    },
  };
}
