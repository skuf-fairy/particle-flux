import {ColorStaticBehaviorConfig} from '../ColorBehavior.types';
import {BaseComponent} from 'src/core/BaseComponent';

export class ColorStaticBehavior extends BaseComponent {
  constructor(private readonly config: ColorStaticBehaviorConfig) {
    super();
  }

  public init(): void {
    this.particle.view.tint = this.config.value;
  }
}
