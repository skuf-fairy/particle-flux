import {PathBehaviorConfig, PathFunction} from './PathBehavior.types';
import {parsePath} from './parsePath';
import {ParticleBaseComponent} from 'src/core/ParticleBaseComponent';

export class PathBehavior extends ParticleBaseComponent {
  public pathFunc: PathFunction;

  constructor(private readonly config: PathBehaviorConfig) {
    super();
  }

  public init(): void {
    this.pathFunc = parsePath(this.config.path);
  }
}
