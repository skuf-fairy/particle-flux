import {Chain, PolygonalChainShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {RealRandom} from '../../utils/random/RealRandom';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';

export class SpawnPolygonalChainBehavior extends ParticleBaseComponent {
  private readonly random: RealRandom;
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: PolygonalChainShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.getSpawnPoint();
    this.particle.view.position.x = position.x + (this.spawnPositionBehavior?.position.x || 0);
    this.particle.view.position.y = position.y + (this.spawnPositionBehavior?.position.y || 0);
  }

  private getSpawnPoint(): Point2d {
    const chain = this.config.chain;

    if (chain.length > 0) {
      if (this.isSingleChain(chain)) {
        return this.getRandomPointOnChain(chain);
      } else {
        return this.getRandomPointOnChain(this.random.choice(chain));
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
      const endPointIndex = this.random.generateIntegerNumber(1, chain.length - 1);
      const endPoint = {x: chain[endPointIndex].x, y: chain[endPointIndex].y};
      const startPoint = {x: chain[endPointIndex - 1].x, y: chain[endPointIndex - 1].y};

      return this.getRandomPointOnLine(startPoint, endPoint);
    } else {
      return {x: 0, y: 0};
    }
  }

  private getRandomPointOnLine(pointA: Point2d, pointB: Point2d): Point2d {
    const randomFactor = Math.random(); // Генерируем случайное число от 0 до 1

    // Вычисляем координаты случайной точки между pointA и pointB
    const x = pointA.x + randomFactor * (pointB.x - pointA.x);
    const y = pointA.y + randomFactor * (pointB.y - pointA.y);

    return {x, y};
  }
}
