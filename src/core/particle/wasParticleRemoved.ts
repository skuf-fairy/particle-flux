import {ViewParticle, IParticle} from '../../types';

export function wasParticleRemoved<View extends ViewParticle>(particle: IParticle<View>): boolean {
  return particle.view.destroyed;
}
