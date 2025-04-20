import {ViewParticle, IParticle} from '../../types';

export function isNeedRemoveParticle<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.isDestroyAfterDeath;
}
