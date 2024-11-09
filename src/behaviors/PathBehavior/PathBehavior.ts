import {PathBehaviorConfig, PathFunction} from './PathBehavior.types';
import {parsePath} from './parsePath';
import {BaseComponent} from 'src/core/BaseComponent';

export class PathBehavior extends BaseComponent {
  public pathFunc: PathFunction;

  constructor(private readonly config: PathBehaviorConfig) {
    super();
  }

  public init(): void {
    this.pathFunc = parsePath(this.config.path);
  }
}
