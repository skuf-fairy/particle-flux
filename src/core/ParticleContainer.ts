import {IParticle, IParticleContainer, IParticleFactory} from '../types';

/**
 * A container for particles, where you can add and remove game objects, as well as get them from the container.
 */
export class ParticleContainer implements IParticleContainer {
  private particles: IParticle[];

  constructor(private readonly particleFactory: IParticleFactory) {
    this.particles = [];
  }

  // returns active particles
  public getParticles(): IParticle[] {
    return this.particles;
  }

  // returns massive active particles
  public getParticlesCount(): number {
    return this.getParticles().length;
  }

  // It updates the particles in the container and cleans them from the destroyed ones.
  public update(elapsedDelta: number, deltaMS: number): void {
    const length = this.particles.length;

    const livingParticles: IParticle[] = [];

    let i = 0;

    while (i < length) {
      const p = this.particles[i];

      // if the particle has already been destroyed in any way, then add it to the array, but do not cause an update.
      if (p.shouldDestroy) {
        p.destroy?.();
      } else {
        p.update!(elapsedDelta, deltaMS);
        livingParticles.push(p);
      }

      i++;
    }

    if (livingParticles.length !== this.particles.length) {
      this.particles = livingParticles;
    }
  }

  public clear(): void {
    this.particles.forEach((p) => p.destroy?.());
    this.particles = [];
  }

  public addParticle(): IParticle {
    const particle = this.particleFactory.create();
    this.particles.push(particle);
    return particle;
  }
}
