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
import {isParticleRemoved} from './particle/isParticleRemoved';
import {shouldRemoveParticle} from './particle/shouldRemoveParticle';
import {ShapePointGenerator} from './spawn-shapes/ShapePointGenerator';

/**
 * Контейнер частиц
 * Реализует паттерн Object Pool
 */
export class ParticleContainer<View extends ViewParticle> implements IParticleContainer<View> {
  public particleHead: IParticle<View> | null;
  public availableParticleHead: IParticle<View> | null;
  private containerParticlesCount: number;

  constructor(
    private readonly viewContainer: ViewContainer<View>,
    private readonly config: ConfigManager<View>,
    private readonly shapePointGenerator: ShapePointGenerator,
  ) {
    this.particleHead = null;
    this.availableParticleHead = null;
    this.containerParticlesCount = 0;

    this.config.subscribeToViewChange(() => {
      this.getParticlesArray().forEach((p) => {
        p.isDestroyAfterDeath = true;
      });
      this.clearPool();
    });
  }

  // вернет массив активных частиц
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
      if (isParticleRemoved(pointer)) {
        removeParticle(this.viewContainer, pointer);
        pointer = this.removeActiveParticle(pointer, false);
      } else if (isParticleDead(pointer)) {
        if (shouldRemoveParticle(pointer)) {
          removeParticle(this.viewContainer, pointer);
          pointer = this.removeActiveParticle(pointer, false);
        } else {
          noUseParticle(pointer);
          pointer = this.removeActiveParticle(pointer, true);
        }
      } else if (!isParticleInUse(pointer)) {
        noUseParticle(pointer);
        pointer = this.removeActiveParticle(pointer, true);
      } else {
        updateParticle(pointer, elapsedDelta, deltaMS);
        this.containerParticlesCount++;
        pointer = pointer.next;
      }
    }
  }

  // удаляет активные частицы, которые переместятся в пул неактивных
  public clearActiveParticles(): void {
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

      if (shouldRemoveParticle(temp)) {
        removeParticle(this.viewContainer, temp);
      } else {
        this.addParticleInPool(temp);
      }
    }

    this.particleHead = null;

    this.containerParticlesCount = 0;
  }

  // полная очистка контейнера (активные + пул)
  public clearActiveParticlesAndPool(): void {
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

  public createParticle(waveParticleIndex: number): IParticle<View> {
    const particle: IParticle<View> =
      this.getFirstAvailableParticleFromPool() ||
      createUnusedParticle(this.viewContainer, createView(this.config.view));

    useParticle(particle, this.config, this.shapePointGenerator, waveParticleIndex);

    this.addToUsedParticles(particle);

    this.containerParticlesCount++;

    return particle;
  }

  public fillPool(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addParticleInPool(createUnusedParticle<View>(this.viewContainer, createView(this.config.view)));
    }
  }

  private removeActiveParticle(particle: IParticle<View>, isMoveInPool: boolean): IParticle<View> | null {
    if (particle === this.particleHead) {
      this.particleHead = this.particleHead.next;
      if (this.particleHead !== null) {
        this.particleHead.prev = null;
      }
    } else {
      if (particle.prev !== null) {
        particle.prev.next = particle.next;
        if (particle.next !== null) {
          particle.next.prev = particle.prev;
        }
      } else {
        // Если particle.prev === null, но particle не является головой, это ошибка
        console.warn('Particle is not head but has no previous');

        // Попытка восстановления: ищем particle в списке и восстанавливаем связи
        let current = this.particleHead;
        let found = false;

        while (current !== null) {
          if (current.next === particle) {
            // нашли предыдущий элемент
            particle.prev = current;
            found = true;
            break;
          }
          current = current.next;
        }

        if (!found) {
          // частица не найдена в списке — возможно, она уже удалена
          // безопасно удаляем ссылки и продолжаем
          particle.next = null;
          return particle.next;
        }

        // После восстановления связи — продолжаем удаление
        if (particle.prev !== null) {
          particle.prev.next = particle.next;
          if (particle.next !== null) {
            particle.next.prev = particle.prev;
          }
        }
      }
    }

    let next: IParticle<View> | null = null;
    if (isMoveInPool) {
      const temp = particle;
      next = particle.next;
      temp.next = null;
      temp.prev = null;
      this.addParticleInPool(temp);
    } else {
      next = particle.next;
    }

    return next;
  }

  private addToUsedParticles(particle: IParticle<View>): void {
    if (this.particleHead === null) {
      this.particleHead = particle;
    } else {
      this.particleHead.prev = particle;
      particle.next = this.particleHead;
      this.particleHead = particle;
    }
  }

  private addParticleInPool(particle: IParticle<View>): void {
    if (this.availableParticleHead === null) {
      this.availableParticleHead = particle;
    } else {
      this.availableParticleHead.prev = particle;
      particle.next = this.availableParticleHead;
      this.availableParticleHead = particle;
    }
  }

  private getFirstAvailableParticleFromPool(): IParticle<View> | null {
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
