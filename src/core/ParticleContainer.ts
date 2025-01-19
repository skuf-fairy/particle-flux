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

  // возвращает активные частицы
  public getParticles(): IParticle[] {
    return [...this.particles].filter((p) => !p.shouldDestroy && !this.destroyedParticles.has(p));
  }

  // количество частиц в контейнере
  public getActiveParticlesCount(): number {
    return this.getParticles().length;
  }

  /**
   * Выполняет обновление частиц в контейнере и чистит от уничтоженных
   * @param delta Время между кадрами
   */
  public update(elapsedDelta: number, deltaMS: number): void {
    this.particles.forEach((p) => {
      // если частица уже каким-либо образом была уничтожена, то добавляем ее в массив, но не вызываем обновление
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
