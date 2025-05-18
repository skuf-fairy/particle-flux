import {ViewParticle, IParticle} from '../../types';
import {ParticleViewContainer} from '../ViewContainer';

export function removeParticle<View extends ViewParticle>(
  viewContainer: ParticleViewContainer<View>,
  particle: IParticle<View>,
): void {
  viewContainer.remove(particle.view);
}
