import {PolygonalChain, Chain} from './SpawnBehaviors.types';

export function isSinglePolygonalChain(chain: PolygonalChain): chain is Chain {
  return !Array.isArray(chain[0]);
}
