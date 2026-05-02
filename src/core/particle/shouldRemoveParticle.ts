import {ViewParticle, IParticle} from '../../types';

export function shouldRemoveParticle<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.isDestroyAfterDeath;
}
