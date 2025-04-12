import {ViewFactory, ViewParticle} from '../../types';
import {realRandom} from '../../utils/random/RealRandom';

export function createView<View extends ViewParticle>(viewFactory: ViewFactory<View>): View {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}
