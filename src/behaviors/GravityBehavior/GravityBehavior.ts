import {GravityBehaviorConfig, isGravityStaticBehaviorConfig} from './GravityBehavior.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {RealRandom} from 'src/utils/random/RealRandom';

export class GravityBehavior extends BaseComponent {
  public gravity: number;

  constructor(private readonly config: GravityBehaviorConfig) {
    super();
  }

  public init(): void {
    if (isGravityStaticBehaviorConfig(this.config)) {
      this.gravity = this.config.value;
    } else {
      this.gravity = new RealRandom().generateFloatNumber(this.config.min, this.config.max) / 100;
    }
  }
}
