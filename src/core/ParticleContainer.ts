import {IParticle, IParticleContainer, IParticleFactory, ViewContainer, ViewParticle} from '../types';

/**
 * Контейнер для игровых объектов,
 * в которой можно добавлять и удалять игровые объекты
 * а так же получать их из контейнера
 */
export class ParticleContainer implements IParticleContainer {
  private particles: Set<IParticle>;

  constructor(
    public readonly viewContainer: ViewContainer<ViewParticle>,
    private readonly particleFactory: IParticleFactory,
  ) {
    this.particles = new Set();
  }

  public getActiveParticlesCount(): number {
    return this.particles.size;
  }

  /**
   * Обновление игровых объектов + чистка от уничтоженных
   * @param delta Время между кадрами
   */
  public onUpdate(delta: number): void {
    const destroyedParticles: IParticle[] = [];

    this.particles.forEach((p) => {
      p.onUpdate?.(delta);

      if (p.shouldDestroy) {
        destroyedParticles.push(p);
      }
    });

    destroyedParticles.forEach((p) => {
      p.onDestroy?.();
      this.particles.delete(p);
    });
  }

  public onDestroy(): void {
    this.particles.forEach((p) => p.onDestroy?.());
    this.particles = new Set();
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
