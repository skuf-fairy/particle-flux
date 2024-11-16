import {Chain, PolygonalChainShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {IVector2} from '../../types';
import {RealRandom} from '../../utils/random/RealRandom';
import {Vector2} from '../../utils/Vector2';

export class SpawnPolygonalChainBehavior extends ParticleBaseComponent {
  private readonly random: RealRandom;

  constructor(private readonly config: PolygonalChainShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.particle.view.position = this.getSpawnPoint();
  }

  private getSpawnPoint(): IVector2 {
    const chain = this.config.chain;

    if (chain.length > 0) {
      if (this.isSingleChain(chain)) {
        return this.getRandomPointOnChain(chain);
      } else {
        return this.getRandomPointOnChain(this.random.choice(chain));
      }
    } else {
      return new Vector2();
    }
  }

  private isSingleChain(chain: Chain | Chain[]): chain is Chain {
    return !Array.isArray(chain[0]);
  }

  private getRandomPointOnChain(chain: Chain): IVector2 {
    if (chain.length === 1) {
      return new Vector2(chain[0].x, chain[0].y);
    } else if (chain.length > 1) {
      const endPointIndex = this.random.generateIntegerNumber(1, chain.length - 1);
      const endPoint = new Vector2(chain[endPointIndex].x, chain[endPointIndex].y);
      const startPoint = new Vector2(chain[endPointIndex - 1].x, chain[endPointIndex - 1].y);

      return this.getRandomPointOnLine(startPoint, endPoint);
    } else {
      return new Vector2();
    }
  }

  private getRandomPointOnLine(pointA: IVector2, pointB: IVector2): IVector2 {
    const randomFactor = Math.random(); // Генерируем случайное число от 0 до 1

    // Вычисляем координаты случайной точки между pointA и pointB
    const x = pointA.x + randomFactor * (pointB.x - pointA.x);
    const y = pointA.y + randomFactor * (pointB.y - pointA.y);

    return new Vector2(x, y);
  }
}
