import {IParticle, IParticleContainer, IParticleFactory} from '../types';

/**
 * Контейнер для частиц, в который можно добавлять и удалять игровые объекты
 * а так же получать их из контейнера
 */
export class ParticleContainer implements IParticleContainer {
  private particles: Set<IParticle>;
  private destroyedParticles: Set<IParticle>;

  constructor(private readonly particleFactory: IParticleFactory) {
    this.particles = new Set();
    this.destroyedParticles = new Set();
  }

  // количество частиц в контейнере
  public getActiveParticlesCount(): number {
    return this.particles.size - this.destroyedParticles.size;
  }

  /**
   * Выполняет обновление частиц в контейнеое и чисит от уничтоженных
   * @param delta Время между кадрами
   */
  public onUpdate(delta: number): void {
    this.particles.forEach((p) => {
      p.onUpdate?.(delta);

      if (p.shouldDestroy) {
        this.destroyedParticles.add(p);
      }
    });

    this.destroyedParticles.forEach((p) => {
      p.onDestroy?.();
      this.particles.delete(p);
    });

    this.destroyedParticles = new Set();
  }

  public onDestroy(): void {
    this.destroyedParticles.forEach((p) => {
      p.onDestroy?.();
      this.particles.delete(p);
    });
    this.particles.forEach((p) => p.onDestroy?.());
    this.particles = new Set();
    this.destroyedParticles = new Set();
  }

  public onPause(): void {
    this.particles.forEach((p) => p.onPause?.());
  }

  public onResume(): void {
    this.particles.forEach((p) => p.onResume?.());
  }

  public addParticle(): void {
    const particle = this.particleFactory.create(this);
    particle.init();
    this.particles.add(particle);
  }

  public clear(): void {
    this.onDestroy();
  }
}
