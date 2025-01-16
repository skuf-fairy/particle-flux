import {RealRandom} from '../utils/random/RealRandom';
import {Ticker} from '../utils/Ticker';
import {IParticleContainer} from '../types';
import {isRangeValue} from '../typeguards';
import {ConfigManager} from './ConfigManager';

/**
 * Обновляет контейнер, создавая частицы по переданному конфигу
 */
export class ParticleEmitter {
  private readonly ticker: Ticker;
  private readonly random: RealRandom;
  // время таймера
  private currentTime: number;
  // время, когда нужно будет заспавнить частицу
  private nextSpawnTime: number | null;

  constructor(private readonly container: IParticleContainer, private readonly config: ConfigManager) {
    this.random = new RealRandom();
    this.ticker = new Ticker(this.handleUpdate);

    this.currentTime = 0;
    this.nextSpawnTime = this.getNextSpawnTime();

    if (this.config.autoStart === undefined || this.config.autoStart) {
      this.ticker.start();
    }
  }

  /**
   * создать частицу и добавить в контейнер, не более указанного maxParticles количества частиц
   * стартует эмиттер
   * @param particlesCount количество частиц
   */
  public emitOnce(particlesCount: number = 1): void {
    const particlesInContainer = this.container.getActiveParticlesCount();
    const maxParticles = this.config.maxParticles;
    const count = !maxParticles
      ? particlesCount
      : Math.min(Math.max(0, maxParticles - particlesInContainer), particlesCount);

    for (let i = 0; i < count; i++) {
      this.emit();
    }

    // стартуем эмиттер, если он остановлен
    if (!this.ticker.started) {
      this.startEmit();
    }
  }

  /**
   * Создает волну частиц, не более указанного maxParticles количества частиц
   * стартует эмиттер
   */
  public emitWave(): void {
    const countPerWave = this.config.spawnParticlesPerWave || 1;
    const particlesInContainer = this.container.getActiveParticlesCount();
    const maxParticles = this.config.maxParticles;
    const count = !maxParticles
      ? countPerWave
      : Math.min(Math.max(0, maxParticles - particlesInContainer), countPerWave);

    for (let i = 0; i < count; i++) {
      this.emit();
    }

    // стартуем эмиттер, если он остановлен
    if (!this.ticker.started) {
      this.startEmit();
    }
  }

  public startEmit(): void {
    this.resetTime();
    this.ticker.start();
  }

  public pauseEmit(): void {
    this.ticker.stop();
  }

  public resumeEmit(): void {
    this.ticker.start();
  }

  /**
   * Остановка эмиттера, которая означает конец его работы по текущему конфигу
   * Очищает контейнер и сбрасывает время
   */
  public stopEmit(): void {
    this.ticker.stop();
    this.clean();
    this.resetTime();
  }

  // очистка контейнера
  public clean(): void {
    this.container.clear();
  }

  /**
   * true если эмиттер запущен и спавнит частицы
   * @returns активен ли эмиттер
   */
  public isActive(): boolean {
    return this.ticker.started;
  }

  // обновление контейнера и создание новых частиц по переданному конфигу
  private handleUpdate = (elapsedDelta: number, deltaMS: number): void => {
    this.currentTime += deltaMS;

    if (this.currentTime < 0) return;

    this.container.update(elapsedDelta, deltaMS);

    // если время работы закончилось
    if (this.config.spawnTime !== undefined && this.currentTime >= this.config.spawnTime) {
      // если время работы вышло, то следим за контейнером, когда он будет пустой, то нужно остановить эмиттер
      if (this.container.getActiveParticlesCount() === 0) {
        this.stopEmit();
      }

      // иначе  просто не даем дальше спавнить
      return;
    }

    // на старте работы эмиттера нужно заспавнить первую волну, чтобы не было задержки
    if (this.nextSpawnTime !== null && this.currentTime - deltaMS <= 0) {
      this.emitWave();

      return;
    }

    // время создать волну частиц
    if (this.nextSpawnTime !== null && this.currentTime >= this.nextSpawnTime) {
      this.emitWave();

      this.nextSpawnTime = this.getNextSpawnTime();
    }
  };

  // создает частицу с переданным шансом на создание
  private emit(): void {
    if (this.config.spawnChance !== undefined) {
      if (this.random.generateFloatNumber(0, 100) < this.config.spawnChance) {
        this.container.addParticle();
      }
    } else {
      this.container.addParticle();
    }
  }

  private getNextSpawnTime(): number | null {
    const spawnInterval = this.config.spawnInterval;

    if (spawnInterval === undefined) return null;

    if (isRangeValue(spawnInterval))
      return this.currentTime + this.random.generateFloatNumber(spawnInterval.min, spawnInterval.max);

    return this.currentTime + spawnInterval;
  }

  // сбрасывает время эмиттера
  private resetTime(): void {
    this.currentTime = this.config.spawnTimeout !== undefined ? -this.config.spawnTimeout : 0;
    this.nextSpawnTime = this.getNextSpawnTime();
  }
}
