import {ViewParticle, IParticle} from '../../types';

export function isParticleRemoved<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.view.destroyed;
}
