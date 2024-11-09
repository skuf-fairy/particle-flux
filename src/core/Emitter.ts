import {ParticleContainer} from './ParticleContainer';
import {RealRandom} from '../utils/random/RealRandom';
import {Ticker} from 'src/utils/Ticker/Ticker';
import {EmitterConfig} from 'src/types';

export class Emitter {
  private readonly ticker: Ticker;
  private readonly random: RealRandom;
  private time: number;
  private lifeTime: number;

  constructor(private readonly container: ParticleContainer, private config: EmitterConfig) {
    this.random = new RealRandom();
    this.ticker = new Ticker();
    this.ticker.autoStart = false;
    this.ticker.add(this.handleUpdate);
    this.time = 0;
    this.lifeTime = 0;
  }

  public setEmitterConfig(config: EmitterConfig): void {
    this.config = config;
  }

  public updateEmitterConfig(key: keyof EmitterConfig, value: number): void {
    this.config[key] = value;
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
    this.ticker.remove(this.handleUpdate);
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

    if (this.time >= this.config.spawnTime) {
      this.emitWave();
      this.time = 0;
    }

    if (this.config.emitterLifeTime && this.lifeTime >= this.config.emitterLifeTime) {
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
}
