import {IParticle, IParticleContainer} from '../types';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer implements IParticleContainer {
  public headParticle: IParticle | null;
  public tailParticle: IParticle | null;
  private containerParticlesCount: number;

  constructor(private readonly particleFactory: () => IParticle) {
    this.headParticle = null;
    this.tailParticle = null;
    this.containerParticlesCount = 0;
  }

  // returns active particles
  public getParticles(): IParticle[] {
    const particleList: IParticle[] = [];

    let particle: IParticle | null = this.headParticle;

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
    let particle: IParticle | null = this.headParticle;
    let prevParticle: IParticle | null = null;
    this.containerParticlesCount = 0;

    while (particle !== null) {
      // if the particle has already been destroyed in any way, then add it to the array, but do not cause an update.
      if (particle.shouldDestroy) {
        particle.destroy?.();

        if (particle === this.headParticle) {
          this.headParticle = this.headParticle.next;
        } else if (prevParticle === null) {
          prevParticle = particle.next;
        } else {
          prevParticle.next = particle.next;
        }
      } else {
        particle.update!(elapsedDelta, deltaMS);
        prevParticle = particle;
        this.containerParticlesCount++;
      }

      particle = particle.next;
    }

    this.tailParticle = prevParticle;
  }

  public clear(): void {
    let particle: IParticle | null = this.headParticle;

    while (particle !== null) {
      particle.destroy?.();
      particle = particle.next;
    }

    this.headParticle = null;
    this.tailParticle = null;

    this.containerParticlesCount = 0;
  }

  public addParticle(): IParticle {
    const particle = this.particleFactory();

    if (this.headParticle === null) {
      this.headParticle = this.tailParticle = particle;
    } else {
      this.tailParticle!.next = particle;
      this.tailParticle = particle;
    }

    this.containerParticlesCount++;

    return particle;
  }
}
