import {IParticle, IParticleContainer, ViewContainer, ViewParticle} from '../types';
import {ConfigManager} from './ConfigManager';
import {Particle} from './Particle';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer implements IParticleContainer {
  public headParticle: IParticle | null;
  public tailParticle: IParticle | null;
  public availableParticleHead: IParticle | null;
  public availableParticleTail: IParticle | null;
  private containerParticlesCount: number;

  constructor(private readonly viewContainer: ViewContainer<ViewParticle>, private readonly config: ConfigManager) {
    this.headParticle = null;
    this.tailParticle = null;
    this.availableParticleHead = null;
    this.availableParticleTail = null;
    this.containerParticlesCount = 0;
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
    let prevParticle: IParticle | null = null;

    while (pointer !== null) {
      // if the particle has already been destroyed in any way, then add it to the array, but do not cause an update.
      if (!pointer.isInUse()) {
        if (pointer === this.headParticle) {
          this.headParticle = this.headParticle.next;
        } else if (prevParticle === null) {
          prevParticle = pointer.next;
        } else {
          prevParticle.next = pointer.next;
        }

        // сохраняем частицу, которая будет добавлена в пул
        const temp = pointer;
        // двигаемся к следующей
        pointer = pointer.next;

        // обнуляем следующую, тк эта будет добавлена последней в пул
        temp.next = null;

        this.addParticleToPool(temp);
      } else {
        pointer.update(elapsedDelta, deltaMS);
        prevParticle = pointer;
        this.containerParticlesCount++;
        pointer = pointer.next;
      }
    }

    this.tailParticle = prevParticle;
  }

  public clear(): void {
    this.availableParticleHead = this.headParticle;
    this.availableParticleTail = this.tailParticle;

    let particle: IParticle | null = this.headParticle;

    while (particle !== null) {
      particle.noUse();
      particle = particle.next;
    }

    this.headParticle = null;
    this.tailParticle = null;

    this.containerParticlesCount = 0;
  }

  public clearPool(): void {
    this.availableParticleHead = null;
    this.availableParticleTail = null;
  }

  public addParticle(): IParticle {
    let particle: IParticle = this.getParticleFromPool() || new Particle(this.viewContainer);

    particle.use(this.config.view, this.config.particleConfig);

    this.addParticleInUsedParticles(particle);

    this.containerParticlesCount++;

    return particle;
  }

  public fillPool(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addParticleToPool(new Particle(this.viewContainer));
    }
  }

  private addParticleInUsedParticles(particle: IParticle): void {
    if (this.headParticle === null) {
      this.headParticle = this.tailParticle = particle;
    } else {
      this.tailParticle!.next = particle;
      this.tailParticle = particle;
    }
  }

  private addParticleToPool(particle: IParticle): void {
    if (this.availableParticleHead === null) {
      this.availableParticleHead = this.availableParticleTail = particle;
    } else {
      this.availableParticleTail!.next = particle;
      this.availableParticleTail = particle;
    }
  }

  private getParticleFromPool(): IParticle | null {
    if (this.availableParticleHead === null) return null;

    const particle = this.availableParticleHead;
    this.availableParticleHead = this.availableParticleHead.next;
    particle.next = null;

    return particle;
  }
}
