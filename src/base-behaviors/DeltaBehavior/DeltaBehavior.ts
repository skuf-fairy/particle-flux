import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {DeltaBehaviorConfig} from './DeltaBehavior.types';

export abstract class DeltaBehavior extends ParticleBaseComponent {
  protected value: number;

  constructor(private readonly config: DeltaBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: number): void;

  public init(): void {
    this.value = this.config.value;
  }

  public update(elapsedDelta: number): void {
    this.value += this.config.delta * elapsedDelta;
    this.updateValue(this.value);
  }
}
