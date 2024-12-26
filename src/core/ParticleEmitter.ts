import {ParticleContainer} from './ParticleContainer';
import {RealRandom} from '../utils/random/RealRandom';
import {Ticker} from '../utils/Ticker/Ticker';
import {EmitterConfig} from '../types';
import {isRangeValue} from '../typeguards';

export class ParticleEmitter {
  private readonly ticker: Ticker;
  private readonly random: RealRandom;
  private currentTime: number;
  private nextSpawnTime: number | null;

  constructor(private readonly container: ParticleContainer, private readonly config: EmitterConfig) {
    this.random = new RealRandom();
    this.ticker = new Ticker();

    this.currentTime = 0;
    this.nextSpawnTime = this.getNextSpawnTime();

    this.ticker.add(this.handleUpdate);

    if (this.config.autoStart === undefined || this.config.autoStart) {
      this.ticker.start();
    }
  }

  public emitOnce(particlesCount: number = 1): void {
    const particlesInContainer = this.container.getActiveParticlesCount();
    const maxParticles = this.config.maxParticles;
    const count = !maxParticles
      ? particlesCount
      : Math.min(Math.max(0, maxParticles - particlesInContainer), particlesCount);

    for (let i = 0; i < count; i++) {
      this.emit();
    }

    // стартуем рендеринг, если эмиттер останвлен
    if (!this.ticker.started) {
      this.startEmit();
    }
  }

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

    // стартуем рендеринг, если эмиттер останвлен
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

  public stopEmit(): void {
    this.ticker.stop();
    this.clean();
    this.resetTime();
  }

  public clean(): void {
    this.container.clear();
  }

  public isActive(): boolean {
    return this.ticker.started;
  }

  private handleUpdate = (ticker: Ticker): void => {
    this.currentTime += ticker.deltaMS;

    this.container.onUpdate(ticker.deltaMS);

    if (this.config.spawnTime !== undefined && this.currentTime >= this.config.spawnTime) {
      // если время работы вышло, то следим за контейнером, когда он будет пустой, то нужно остановить эмиттер
      if (this.container.count() === 0) {
        this.stopEmit();
      }

      // иначе  просто не даем дальше спавнить
      return;
    }

    if (this.nextSpawnTime !== null && this.currentTime >= this.nextSpawnTime) {
      this.emitWave();

      this.nextSpawnTime = this.getNextSpawnTime();
    }
  };

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

  private resetTime(): void {
    this.currentTime = 0;
    this.nextSpawnTime = this.getNextSpawnTime();
  }
}
