import {ViewParticle, ViewContainer, IParticle} from '../../types';

export function removeParticle<View extends ViewParticle>(
  viewContainer: ViewContainer<View>,
  particle: IParticle<View>,
): void {
  viewContainer.removeChild(particle.view);
}
