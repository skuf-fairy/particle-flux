import {ViewContainer} from '../../types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';

export class ViewComponent extends ParticleBaseComponent {
  constructor(private readonly viewContainer: ViewContainer) {
    super();
  }

  public init(): void {
    this.viewContainer.addChild(this.particle.view);
  }

  public destroy(): void {
    this.viewContainer.removeChild(this.particle.view);
  }
}
