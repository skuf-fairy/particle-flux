import {realRandom} from '../../utils/random/Random';
import {ViewFactory, ViewParticle} from '../../types';

export function createView<View extends ViewParticle>(viewFactory: ViewFactory<View>): View {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}
