import {ViewParticle, IParticle} from '../../types';

export function isParticleInUse<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.inUse;
}
