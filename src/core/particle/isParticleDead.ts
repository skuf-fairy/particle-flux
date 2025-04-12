import {ViewParticle, IParticle} from '../../types';

export function isParticleDead<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.age === particle.lifeTime;
}
