import {SpawnCircleShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {RealRandom} from '../../utils/random/RealRandom';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';

export class SpawnCircleBehavior extends ParticleBaseComponent {
  private readonly random: RealRandom;
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnCircleShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.getRandomPointFromCircle(this.config.x, this.config.y, this.config.radius);

    this.particle.view.position = {
      x: position.x + (this.spawnPositionBehavior?.position.x || 0),
      y: position.y + (this.spawnPositionBehavior?.position.y || 0),
    };
  }

  private getRandomPointFromCircle(x: number, y: number, radius: number): Point2d {
    // Генерируем случайный угол в радианах
    const angle = this.random.generateFloatNumber(0, 2 * Math.PI);

    // Генерируем случайное значение радиуса в пределах от 0 до заданного радиуса
    const r = this.random.generateFloatNumber(0, radius);

    // Вычисляем координаты точки
    const pointX = x + r * Math.cos(angle);
    const pointY = y + r * Math.sin(angle);

    return {x: pointX, y: pointY};
  }
}
