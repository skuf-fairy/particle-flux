import {ViewParticle, IParticle} from '../../types';

export function noUseParticle<View extends ViewParticle>(particle: IParticle<View>): void {
  particle.view.visible = false;
  particle.inUse = false;
}
