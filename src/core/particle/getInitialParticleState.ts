import {ViewParticle, IParticle} from '../../types';

export function getInitialParticleState<View extends ViewParticle>(): Omit<IParticle<View>, 'view'> {
  return {
    speed: 0,
    deltaPath: {x: 0, y: 0},
    initialPosition: {x: 0, y: 0},
    deltaDirection: {x: 0, y: 0},
    directionRotation: 0,
    direction: {x: 0, y: 0},
    speedBehavior: null,
    gravityBehavior: 0,
    pathFunc: null,
    isRotateByDirection: false,

    next: null,
    prev: null,
    inUse: false,
    age: 0,
    lifeTime: 0,

    alphaBehavior: null,
    rotationBehavior: null,
    scaleBehavior: null,
    colorBehavior: null,

    isDestroyAfterDeath: false,

    initialViewState: {
      alpha: 1,
      tint: '#ffffff',
      angle: 0,
    },
  };
}
