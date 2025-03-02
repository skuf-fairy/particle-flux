import {Chain, PolygonalChainShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {realRandom} from '../../utils/random/RealRandom';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';

export class SpawnPolygonalChainBehavior extends ParticleBaseComponent {
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: PolygonalChainShape) {
    super();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.getSpawnPoint();
    this.particle.view.position = {
      x: position.x + (this.spawnPositionBehavior?.position.x || 0),
      y: position.y + (this.spawnPositionBehavior?.position.y || 0),
    };
  }

  private getSpawnPoint(): Point2d {
    const chain = this.config.chain;

    if (chain.length > 0) {
      if (this.isSingleChain(chain)) {
        return this.getRandomPointOnChain(chain);
      } else {
        return this.getRandomPointOnChain(realRandom.choice(chain));
      }
    } else {
      return {x: 0, y: 0};
    }
  }

  private isSingleChain(chain: Chain | Chain[]): chain is Chain {
    return !Array.isArray(chain[0]);
  }

  private getRandomPointOnChain(chain: Chain): Point2d {
    if (chain.length === 1) {
      return {x: chain[0].x, y: chain[0].y};
    } else if (chain.length > 1) {
      const endPointIndex = realRandom.generateIntegerNumber(1, chain.length - 1);
      const endPoint = {x: chain[endPointIndex].x, y: chain[endPointIndex].y};
      const startPoint = {x: chain[endPointIndex - 1].x, y: chain[endPointIndex - 1].y};

      return this.getRandomPointOnLine(startPoint, endPoint);
    } else {
      return {x: 0, y: 0};
    }
  }

  private getRandomPointOnLine(pointA: Point2d, pointB: Point2d): Point2d {
    const randomFactor = Math.random(); // Generating a random number from 0 to 1

    // Calculating the coordinates of a random point between point and pointB
    const x = pointA.x + randomFactor * (pointB.x - pointA.x);
    const y = pointA.y + randomFactor * (pointB.y - pointA.y);

    return {x, y};
  }
}
