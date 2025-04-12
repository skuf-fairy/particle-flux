import {ViewParticle, ViewRenderFn} from '../../types';
import {realRandom} from '../../utils/random/RealRandom';

export function createView<View extends ViewParticle>(viewFactory: ViewRenderFn<View> | ViewRenderFn<View>[]): View {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}
