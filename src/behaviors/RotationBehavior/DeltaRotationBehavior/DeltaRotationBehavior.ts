import {ParticleBaseComponent} from '../../../core/ParticleBaseComponent';
import {DeltaRotationConfig} from '../RotationBehavior.types';

export class DeltaRotationBehavior extends ParticleBaseComponent {
  constructor(private readonly config: DeltaRotationConfig) {
    super();
  }

  public init(): void {
    this.particle.view.angle = this.config.value;
  }

  public onUpdate(delta: number): void {
    this.particle.view.angle += this.config.deltaAngle * delta;
  }
}
