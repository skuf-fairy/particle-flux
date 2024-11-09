import {ColorStaticBehaviorConfig} from '../ColorBehavior.types';
import {ParticleBaseComponent} from 'src/core/ParticleBaseComponent';

export class ColorStaticBehavior extends ParticleBaseComponent {
  constructor(private readonly config: ColorStaticBehaviorConfig) {
    super();
  }

  public init(): void {
    this.particle.view.tint = this.config.value;
  }
}
