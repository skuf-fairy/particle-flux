import {LifeTimeBehaviorConfig} from './LifeTimeBehavior.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {TimeComponent} from '../../components/TimeComponent/TimeComponent';
import {RealRandom} from '../../utils/random/RealRandom';
import {isLifeTimeStaticBehaviorConfig} from './LifeTimeBehavior.typeguards';

export class LifeTimeBehavior extends ParticleBaseComponent {
  // прогресс жизни чатицы в диапазоне [0, 1]
  public lifeTimeNormalizedProgress: number;
  // оставшееся время жизни в миллисекундах
  public remainingLifeTime: number;
  // время жизни частицы в миллисекундах после которого она уничтожится
  public lifeTime: number;

  private timeComponent?: TimeComponent;

  constructor(private readonly config: LifeTimeBehaviorConfig) {
    super();
  }

  public init(): void {
    if (isLifeTimeStaticBehaviorConfig(this.config)) {
      this.lifeTime = this.config.value;
    } else {
      this.lifeTime = new RealRandom().generateIntegerNumber(this.config.min, this.config.max);
    }

    this.lifeTimeNormalizedProgress = 0;
    this.remainingLifeTime = this.lifeTime;

    this.timeComponent = this.particle.getComponent(TimeComponent);
  }

  public onUpdate(): void {
    this.remainingLifeTime = Math.max(0, this.remainingLifeTime - (this.timeComponent?.delta || 0));
    this.lifeTimeNormalizedProgress = 1 - this.remainingLifeTime / this.lifeTime;

    if (this.isDead()) {
      this.particle.shouldDestroy = true;
    }
  }

  private isDead(): boolean {
    return this.remainingLifeTime === 0;
  }
}
