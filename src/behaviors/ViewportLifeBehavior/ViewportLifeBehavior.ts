import {ViewportLifeBehaviorConfig} from './ViewportLifeBehavior.types';
import {isRectIntersectsRect} from 'aabb-collisions-detector';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {ViewPort} from '../../types';

export class ViewportLifeBehavior extends ParticleBaseComponent {
  private viewPort: ViewPort;

  constructor(private readonly config: ViewportLifeBehaviorConfig) {
    super();
  }

  public init(): void {
    this.viewPort = {...this.config};
  }

  public onUpdate(): void {
    if (
      !isRectIntersectsRect(
        {
          x: this.particle.view.position.x,
          y: this.particle.view.position.y,
          width: this.particle.view.width,
          height: this.particle.view.height,
        },
        this.viewPort,
      )
    ) {
      this.particle.shouldDestroy = true;
    }
  }
}
