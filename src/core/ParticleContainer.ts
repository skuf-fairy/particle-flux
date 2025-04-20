import {isParticleDead} from './particle/isParticleDead';
import {isParticleInUse} from './particle/isParticleInUse';
import {noUseParticle} from './particle/noUseParticle';
import {IParticleContainer, ViewContainer, IParticle, ViewParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {createUnusedParticle} from './particle/createUnusedParticle';
import {createView} from './particle/createView';
import {removeParticle} from './particle/removeParticle';
import {updateParticle} from './particle/updateParticle';
import {useParticle} from './particle/useParticle';
import {wasParticleRemoved} from './particle/wasParticleRemoved';
import {isNeedRemoveParticle} from './particle/isNeedRemoveParticle';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer<View extends ViewParticle> implements IParticleContainer<View> {
  public particleHead: IParticle<View> | null;
  public availableParticleHead: IParticle<View> | null;
  private containerParticlesCount: number;

  constructor(private readonly viewContainer: ViewContainer<View>, private readonly config: ConfigManager<View>) {
    this.particleHead = null;
    this.availableParticleHead = null;
    this.containerParticlesCount = 0;

    this.config.subscribeToViewChange(() => {
      this.getParticlesArray().forEach((p) => {
        p.isDestroyAfterDeath = true;
      });
      this.getPoolParticlesArray();
    });
  }

  // returns active particles
  public getParticlesArray(): IParticle<View>[] {
    const particleList: IParticle<View>[] = [];

    let particle: IParticle<View> | null = this.particleHead;

    while (particle !== null) {
      particleList.push(particle);

      particle = particle.next;
    }

    return particleList;
  }

  public getPoolParticlesArray(): IParticle<View>[] {
    const particleList: IParticle<View>[] = [];

    let particle: IParticle<View> | null = this.availableParticleHead;

    while (particle !== null) {
      particleList.push(particle);

      particle = particle.next;
    }

    return particleList;
  }

  // returns massive active particles
  public getParticlesCount(): number {
    return this.containerParticlesCount;
  }

  // It updates the particles in the container and cleans them from the destroyed ones.
  public update(elapsedDelta: number, deltaMS: number): void {
    this.containerParticlesCount = 0;

    let pointer: IParticle<View> | null = this.particleHead;

    while (pointer !== null) {
      if (wasParticleRemoved(pointer) || isNeedRemoveParticle(pointer)) {
        removeParticle(this.viewContainer, pointer);
        pointer = this.removeActiveParticle(pointer, false);
      } else if (isParticleDead(pointer) || !isParticleInUse(pointer)) {
        noUseParticle(pointer);
        pointer = this.removeActiveParticle(pointer, true);
      } else {
        updateParticle(pointer, elapsedDelta, deltaMS);
        this.containerParticlesCount++;
        pointer = pointer.next;
      }
    }
  }

  public clear(): void {
    let particle: IParticle<View> | null = this.particleHead;

    while (particle !== null) {
      noUseParticle(particle);
      // сохраняем частицу, которая будет добавлена в пул
      const temp = particle;
      // двигаемся к следующей
      particle = particle.next;
      // обнуляем следующую, тк эта будет добавлена в пул
      temp.next = null;
      temp.prev = null;

      this.addParticleToPool(temp);
    }

    this.particleHead = null;

    this.containerParticlesCount = 0;
  }

  public clearViewContainer(): void {
    let particle: IParticle<View> | null = this.particleHead;

    while (particle !== null) {
      removeParticle(this.viewContainer, particle);
      particle = particle.next;
    }

    this.particleHead = null;

    this.clearPool();

    this.containerParticlesCount = 0;
  }

  public clearPool(): void {
    let particle: IParticle<View> | null = this.availableParticleHead;

    while (particle !== null) {
      removeParticle(this.viewContainer, particle);

      particle = particle.next;
    }

    this.availableParticleHead = null;
  }

  public createParticle(): IParticle<View> {
    const particle: IParticle<View> =
      this.getParticleFromPool() || createUnusedParticle(this.viewContainer, createView(this.config.view));

    useParticle(particle, this.config.particleConfig);

    this.addParticleInUsedParticles(particle);

    this.containerParticlesCount++;

    return particle;
  }

  public fillPool(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addParticleToPool(createUnusedParticle<View>(this.viewContainer, createView(this.config.view)));
    }
  }

  private removeActiveParticle(particle: IParticle<View>, isMoveInPool: boolean): IParticle<View> | null {
    if (particle === this.particleHead) {
      this.particleHead = this.particleHead.next;
      if (this.particleHead !== null) {
        this.particleHead.prev = null;
      }
    } else if (particle.prev !== null) {
      particle.prev.next = particle.next;

      if (particle.next !== null) {
        particle.next.prev = particle.prev;
      }
    }

    let next: IParticle<View> | null = null;
    if (isMoveInPool) {
      // сохраняем частицу, которая будет добавлена в пул
      const temp = particle;
      next = particle.next;
      // обнуляем следующую, тк эта будет добавлена в пул
      temp.next = null;
      temp.prev = null;
      this.addParticleToPool(temp);
    } else {
      next = particle.next;
    }

    return next;
  }

  private addParticleInUsedParticles(particle: IParticle<View>): void {
    if (this.particleHead === null) {
      this.particleHead = particle;
    } else {
      this.particleHead.prev = particle;
      particle.next = this.particleHead;
      this.particleHead = particle;
    }
  }

  private addParticleToPool(particle: IParticle<View>): void {
    if (this.availableParticleHead === null) {
      this.availableParticleHead = particle;
    } else {
      this.availableParticleHead.prev = particle;
      particle.next = this.availableParticleHead;
      this.availableParticleHead = particle;
    }
  }

  private getParticleFromPool(): IParticle<View> | null {
    if (this.availableParticleHead === null) return null;

    const particle = this.availableParticleHead;
    this.availableParticleHead = this.availableParticleHead.next;

    if (this.availableParticleHead !== null) {
      this.availableParticleHead.prev = null;
    }

    particle.next = null;
    particle.prev = null;

    return particle;
  }
}
