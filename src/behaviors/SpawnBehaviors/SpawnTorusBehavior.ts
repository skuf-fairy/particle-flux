import {SpawnTorusShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {RealRandom} from '../../utils/random/RealRandom';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';
import {NumberUtils} from '../../utils/NumberUtils';

export class SpawnTorusBehavior extends ParticleBaseComponent {
  private readonly random: RealRandom;
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnTorusShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.getRandomPointFromTorus(
      this.config.x,
      this.config.y,
      this.config.innerRadius || 0,
      this.config.outerRadius,
      NumberUtils.degreesToRadians(this.config.startAngle || 0),
      NumberUtils.degreesToRadians(this.config.endAngle || 360),
    );

    this.particle.view.position = {
      x: position.x + (this.spawnPositionBehavior?.position.x || 0),
      y: position.y + (this.spawnPositionBehavior?.position.y || 0),
    };
  }

  private getRandomPointFromTorus(
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
  ): Point2d {
    // Генерируем случайный угол в радианах
    const angle = this.random.generateFloatNumber(startAngle, endAngle);

    // Генерируем случайное значение радиуса в пределах от внутреннего до внешнего радиуса
    const r = this.random.generateFloatNumber(innerRadius, outerRadius);

    // Вычисляем координаты точки
    const pointX = x + r * Math.cos(angle);
    const pointY = y + r * Math.sin(angle);

    return {x: pointX, y: pointY};
  }
}
