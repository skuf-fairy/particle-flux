import {IParticle, IParticleContainer, IParticleFactory} from '../types';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer implements IParticleContainer {
  private particles: Set<IParticle>;
  private destroyedParticles: Set<IParticle>;

  constructor(private readonly particleFactory: IParticleFactory) {
    this.particles = new Set();
    this.destroyedParticles = new Set();
  }

  // returns active particles
  public getParticles(): IParticle[] {
    return [...this.particles].filter((p) => !p.shouldDestroy && !this.destroyedParticles.has(p));
  }

  // returns massive active particles
  public getParticlesCount(): number {
    return this.getParticles().length;
  }

  // It updates the particles in the container and cleans them from the destroyed ones.
  public update(elapsedDelta: number, deltaMS: number): void {
    this.particles.forEach((p) => {
      // if the particle has already been destroyed in any way, then add it to the array, but do not cause an update.
      if (p.shouldDestroy) {
        this.destroyedParticles.add(p);
        return;
      }

      p.update?.(elapsedDelta, deltaMS);

      if (p.shouldDestroy) {
        this.destroyedParticles.add(p);
      }
    });

    this.destroyedParticles.forEach((p) => {
      p.destroy?.();
      this.particles.delete(p);
    });

    this.destroyedParticles = new Set();
  }

  public clear(): void {
    this.destroyedParticles.forEach((p) => {
      p.destroy?.();
      this.particles.delete(p);
    });
    this.particles.forEach((p) => p.destroy?.());
    this.particles = new Set();
    this.destroyedParticles = new Set();
  }

  public addParticle(): IParticle {
    const particle = this.particleFactory.create();
    this.particles.add(particle);
    return particle;
  }
}
