import {GravityBehaviorConfig, isGravityStaticBehaviorConfig} from './GravityBehavior.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {RealRandom} from '../../utils/random/RealRandom';

export class GravityBehavior extends ParticleBaseComponent {
  public gravity: number;

  constructor(private readonly config: GravityBehaviorConfig) {
    super();
  }

  public init(): void {
    if (isGravityStaticBehaviorConfig(this.config)) {
      this.gravity = this.config.value;
    } else {
      // todo здесь деление для ввода больших чисел, но может убрать
      this.gravity = new RealRandom().generateFloatNumber(this.config.min, this.config.max) / 100;
    }
  }
}
