import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {ScriptBehaviorConfig, TimeScriptConfig} from './ScriptBehavior.types';
import {ArrayUtils} from '../../utils/ArrayUtils';
import {NumberUtils} from '../../utils/NumberUtils';

export abstract class ScriptBehavior<V> extends ParticleBaseComponent {
  protected lifeTimeBehavior?: LifeTimeBehavior;
  protected scriptConfig: TimeScriptConfig<V>;

  constructor(protected readonly config: ScriptBehaviorConfig<V>) {
    super();
  }

  protected abstract updateValue(value: V): void;

  public init(): void {
    this.scriptConfig = this.config.script.slice().sort((a, b) => a.time - b.time);

    if (this.scriptConfig.length === 0) {
      // todo making mistakes
      throw new Error('Script config must contain at least 1 item');
    }

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.update();
  }

  public update(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): V {
    return this.getCurrentScriptItem(progress);
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }

  private getCurrentScriptItem(time: number): V {
    for (let i = 1; i < this.scriptConfig.length; i++) {
      if (NumberUtils.inRange(this.scriptConfig[i - 1].time, this.scriptConfig[i].time, time)) {
        return this.scriptConfig[i - 1].value;
      }
    }

    // the check was on initialization, but here we skip
    return ArrayUtils.last(this.scriptConfig)!.value;
  }
}
