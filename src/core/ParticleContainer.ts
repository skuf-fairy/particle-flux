import {IParticleContainer, ViewContainer, ViewParticle, IParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {
  createParticle,
  useParticle,
  noUseParticle,
  updateParticle,
  isParticleInUse,
  createView,
  removeParticle,
} from './Particle';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer implements IParticleContainer {
  public headParticle: IParticle | null;
  public availableParticleHead: IParticle | null;
  private containerParticlesCount: number;

  constructor(private readonly viewContainer: ViewContainer<ViewParticle>, private readonly config: ConfigManager) {
    this.headParticle = null;
    this.availableParticleHead = null;
    this.containerParticlesCount = 0;

    this.config.subscribeToViewChange(() => {
      this.clearPool();
    });
  }

  // returns active particles
  public getParticlesArray(): IParticle[] {
    const particleList: IParticle[] = [];

    let particle: IParticle | null = this.headParticle;

    while (particle !== null) {
      particleList.push(particle);

      particle = particle.next;
    }

    return particleList;
  }

  public getPoolParticlesArray(): IParticle[] {
    const particleList: IParticle[] = [];

    let particle: IParticle | null = this.availableParticleHead;

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

    let pointer: IParticle | null = this.headParticle;

    while (pointer !== null) {
      // if the particle has already been destroyed in any way, then add it to the array, but do not cause an update.
      if (!isParticleInUse(pointer)) {
        if (pointer === this.headParticle) {
          this.headParticle = this.headParticle.next;
          if (this.headParticle !== null) {
            this.headParticle.prev = null;
          }
        } else if (pointer.prev !== null) {
          pointer.prev.next = pointer.next;

          if (pointer.next !== null) {
            pointer.next.prev = pointer.prev;
          }
        }

        // сохраняем частицу, которая будет добавлена в пул
        const temp = pointer;
        // двигаемся к следующей
        pointer = pointer.next;
        // обнуляем следующую, тк эта будет добавлена в пул
        temp.next = null;
        temp.prev = null;

        this.addParticleToPool(temp);
      } else {
        updateParticle(pointer, elapsedDelta, deltaMS);
        this.containerParticlesCount++;
        pointer = pointer.next;
      }
    }
  }

  public clear(): void {
    let particle: IParticle | null = this.headParticle;

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

    this.headParticle = null;

    this.containerParticlesCount = 0;
  }

  public clearViewContainer(): void {
    let particle: IParticle | null = this.headParticle;

    while (particle !== null) {
      removeParticle(this.viewContainer, particle);
      particle = particle.next;
    }

    this.headParticle = null;

    this.clearPool();

    this.containerParticlesCount = 0;
  }

  public clearPool(): void {
    let particle: IParticle | null = this.availableParticleHead;

    while (particle !== null) {
      removeParticle(this.viewContainer, particle);

      particle = particle.next;
    }

    this.availableParticleHead = null;
  }

  public addParticle(): IParticle {
    const particle: IParticle =
      this.getParticleFromPool() || createParticle(this.viewContainer, createView(this.config.view));

    useParticle(particle, this.config.particleConfig);

    this.addParticleInUsedParticles(particle);

    this.containerParticlesCount++;

    return particle;
  }

  public fillPool(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addParticleToPool(createParticle(this.viewContainer, createView(this.config.view)));
    }
  }

  private addParticleInUsedParticles(particle: IParticle): void {
    if (this.headParticle === null) {
      this.headParticle = particle;
    } else {
      this.headParticle.prev = particle;
      particle.next = this.headParticle;
      this.headParticle = particle;
    }
  }

  private addParticleToPool(particle: IParticle): void {
    if (this.availableParticleHead === null) {
      this.availableParticleHead = particle;
    } else {
      this.availableParticleHead.prev = particle;
      particle.next = this.availableParticleHead;
      this.availableParticleHead = particle;
    }
  }

  private getParticleFromPool(): IParticle | null {
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
