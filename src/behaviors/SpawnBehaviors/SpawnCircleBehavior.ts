import {SpawnCircleShape} from './SpawnBehaviors.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {IVector2} from 'src/types';
import {RealRandom} from 'src/utils/random/RealRandom';
import {Vector2} from 'src/utils/Vector2';

export class SpawnCircleBehavior extends BaseComponent {
  private readonly random: RealRandom;

  constructor(private readonly config: SpawnCircleShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.particle.view.position = this.getRandomPointFromCircle(this.config.x, this.config.y, this.config.radius);
  }

  private getRandomPointFromCircle(x: number, y: number, radius: number): IVector2 {
    // Генерируем случайный угол в радианах
    const angle = this.random.generateFloatNumber(0, 2 * Math.PI);

    // Генерируем случайное значение радиуса в пределах от 0 до заданного радиуса
    const r = this.random.generateFloatNumber(0, radius);

    // Вычисляем координаты точки
    const pointX = x + r * Math.cos(angle);
    const pointY = y + r * Math.sin(angle);

    return new Vector2(pointX, pointY);
  }
}
