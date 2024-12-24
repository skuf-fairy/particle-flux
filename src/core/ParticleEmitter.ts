import {ParticleContainer} from './ParticleContainer';
import {RealRandom} from '../utils/random/RealRandom';
import {Ticker} from '../utils/Ticker/Ticker';
import {EmitterConfig} from '../types';
import {isRangeValue} from '../typeguards';

export class ParticleEmitter {
  private readonly ticker: Ticker;
  private readonly random: RealRandom;
  private time: number;
  private lifeTime: number;
  private spawnTime: number | null;

  constructor(private readonly container: ParticleContainer, private readonly config: EmitterConfig) {
    this.random = new RealRandom();
    this.ticker = new Ticker();

    this.time = 0;
    this.lifeTime = 0;

    const nextSpawnTime = this.getNextSpawnTime();
    this.spawnTime = nextSpawnTime !== undefined ? nextSpawnTime : null;

    this.ticker.add(this.handleUpdate);

    if (this.config.autoStart === undefined) {
      this.ticker.autoStart = true;
    } else {
      this.ticker.autoStart = this.config.autoStart;
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
  }

  public startEmit(): void {
    this.emitWave();
    this.ticker.start();
  }

  public pauseEmit(): void {
    this.ticker.stop();
  }

  public stopEmit(): void {
    this.ticker.stop();
    this.clean();
  }

  public clean(): void {
    this.container.clear();
    this.time = 0;
    this.lifeTime = 0;
  }

  private handleUpdate = (ticker: Ticker): void => {
    this.time += ticker.deltaMS;
    if (this.config.emitterLifeTime !== undefined) {
      this.lifeTime += ticker.deltaMS;
    }

    this.container.onUpdate(ticker.deltaMS);

    if (this.spawnTime !== null && this.time >= this.spawnTime) {
      this.emitWave();
      this.time = 0;
    }

    if (this.config.emitterLifeTime !== undefined && this.lifeTime >= this.config.emitterLifeTime) {
      this.stopEmit();
      this.lifeTime = 0;
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

  private getNextSpawnTime(): number | undefined {
    const spawnInterval = this.config.spawnInterval;

    if (spawnInterval === undefined) return;

    if (isRangeValue(spawnInterval)) return this.random.generateFloatNumber(spawnInterval.min, spawnInterval.max);

    return spawnInterval;
  }
}
