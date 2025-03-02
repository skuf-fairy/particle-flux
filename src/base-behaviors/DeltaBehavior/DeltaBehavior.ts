import {realRandom} from '../../utils/random/RealRandom';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {DeltaBehaviorConfig} from './DeltaBehavior.types';
import {isRangeValue} from '../../typeguards';

export abstract class DeltaBehavior extends ParticleBaseComponent {
  protected value: number;

  constructor(private readonly config: DeltaBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: number): void;

  public init(): void {
    this.value = this.config.value * this.getInitialMultiplier();

    this.update(0);
  }

  public update(elapsedDelta: number): void {
    this.value += this.config.delta * elapsedDelta;
    this.updateValue(this.value);
  }

  private getInitialMultiplier(): number {
    const multiplier = this.config.multiplier;

    if (multiplier) {
      if (isRangeValue(multiplier)) {
        return realRandom.generateFloatNumber(multiplier.min, multiplier.max);
      } else {
        return multiplier;
      }
    }

    return 1;
  }
}
