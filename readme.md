# Particle Flux

A particle system for various graphics libraries in JavaScript.

An interactive editor for configuring of the emitter. TODO

## Using the pixi.js (v8) example

A simple example of using an emitter

```typescript
import {ParticleFlux} from 'particle-flux';
import {Application, Assets, Sprite} from 'pixi.js';

async function init() {
  // init pixi app
  const app = new Application();

  await app.init();
  const particleTexture = await Assets.load(PATH_TO_TEXTURE);

  // set particle fabric function
  function createParticle(): Sprite {
    const sprite = new Sprite(particleTexture);

    sprite.anchor.set(0.5);

    return sprite;
  }

  // create emitter
  new ParticleFlux<ContainerChild>(app.stage, createParticle, {
    emitterConfig: {spawnInterval: 150},
    particleBehaviorsConfig: {
      lifeTime: {value: 250},
      speed: {
        start: 1,
        end: 0,
      },
      scale: {
        start: 1,
        end: 0,
      },
      alpha: {
        start: 1,
        end: 0,
      },
    },
  });
}

init();
```

## Interactive Examples

Examples of some animations and effects that can be created using the emitter. All the examples use [pixi.js](https://www.npmjs.com/package/pixi.js), but all of them can be executed on any other library for rendering on canvas.

- [Pulse](https://codepen.io/vladosina/pen/OPLGQyG)
- [Points](https://codepen.io/vladosina/pen/QwLPQYG)
- [Bubbles](https://codepen.io/vladosina/pen/raBbdav)
- [Bubbles Spiral (Particles Path)](https://codepen.io/vladosina/pen/azoxYdQ)
- [Cartoon Smoke Blast](https://codepen.io/vladosina/pen/QwLPmdM)
- [Flame](https://codepen.io/vladosina/pen/mybgxwV)
- [Snow Flow](https://codepen.io/vladosina/pen/ZYzZoKg)
- [SVG & PIXI equal animation](https://codepen.io/vladosina/pen/xbxvxNw)

## Particle Emitter Config

The configuration of the particle emitter, which is responsible for creating particles

```typescript
interface EmitterConfig {
  spawnInterval?: NumberValue;
  spawnTime?: number;
  spawnTimeout?: number;
  maxParticles?: number;
  spawnParticlesPerWave?: number;
  spawnChance?: number;
  autoStart?: boolean;
}
```

### Spawn Interval

Determines the frequency at which the particle wave will be generated. Specified in milliseconds. If not specified, the emitter will operate in standby mode and the particles must be compared using the **emitOnce** and **emitWave methods.**
It can be as constant, for example, if you specify 250 ms, then every 250 ms (at least if the browser allows) a wave of particles will be created.
You can also specify this parameter in the range format:

```typescript
type RangeValue = {
  min: number;
  max: number;
};
```

then the next generation of the particle wave will be after a random time in the range from **min** to **max** inclusive.

### Spawn Time

Determines the operating time of the emitter. Specified in milliseconds. If not specified, the emitter will infinitely spawn particles (unless, of course, the **Spawn Interval** was specified)

### Spawn Timeout

Timeout until the first particle wave is created

### Max Particles

Defines the maximum number of particles that are in the container at the same time. There are no restrictions by default.

### Spawn Particles Per Wave

It determines how many particles per wave will be created, but no more than **Max Particles**. By default, it is equal to **1** .

### Spawn Chance

Determines the chance of creating a particle. Value from **0** before **100** . The default value is **100**

### Autostart

Determines the auto-start of the emitter, that is, the creation of particles. By default **true**

## Particle Behavior Config

A configuration for each particle that defines its initial position, direction of motion, velocity, and other parameters for its display.

```typescript
interface ParticleBehaviorConfig {
  lifeTime: LifeTimeBehaviorConfig;
  spawnPosition?: SpawnPositionBehaviorConfig;
  spawnShape?: SpawnShapeBehavior;
  direction?: DirectionBehaviorConfig;
  speed?: SpeedBehaviorConfig;
  scale?: ScaleBehaviorConfig;
  alpha?: AlphaBehaviorConfig;
  gravity?: GravityBehaviorConfig;
  rotation?: RotationBehaviorConfig;
  color?: ColorBehaviorConfig;
  path?: PathBehaviorConfig;
}
```

### Life Time

Determines the lifetime of the particle. Required field. Specified in milliseconds.
Parameters that change over time relative to the lifetime of the particle.
It can be static, meaning the lifetime of each created particle will always be the same.

```typescript
interface LifeTimeStaticBehaviorConfig {
  value: number;
}
```

If you pass a range, the lifetime of the created particle will vary from **min** to **max**

```typescript
interface LifeTimeRangeBehaviorConfig {
  min: number;
  max: number;
}
```

### Spawn Position

Defines the initial position of the particle or, if **Spawn Shape** is specified, the position relative to which the position is calculated using the config in **Spawn Shape**. By default, this is the origin.

```typescript
interface SpawnPositionBehaviorConfig {
  x: number;
  y: number;
}
```

### Spawn Shape

Defines the area where a particle can be created. The area can be one of the following configurations.

#### Point Spawn Shape

The area for creating a particle is a point.

```typescript
interface SpawnPointShape {
  type: SpawnShapeType.Point;
  x: number;
  y: number;
}
```

#### Rectangle Spawn Shape

The area for creating the particle is a rectangle parallel to the X-axis.

```typescript
interface SpawnRectangleShape {
  type: SpawnShapeType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
}
```

#### Torus Spawn Shape

Область для создания частицы - торус. Если не заданы опциональные параметры, то будет круг.

```typescript
interface SpawnTorusShape {
  type: SpawnShapeType.Torus;
  x: number;
  y: number;
  outerRadius: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}
```

#### Polygonal Chain Spawn Shape

The area for creating the particle is the polygon line.

```typescript
interface Point2d {
  x: number;
  y: number;
}

type Chain = Point2d[];

interface PolygonalChainShape {
  type: SpawnShapeType.Polygon;
  chain: Chain | Chain[];
}
```

Chain[] - separated polygons

### Direction

Determines the direction of movement of the particle. It is measured in degrees.

It can be static, then every particle will move in that direction.

```typescript
interface StaticDirectionBehaviorConfig {
  angle: number;
}
```

You can pass a range, then the direction of movement of the particle will be random in this range.

```typescript
interface DirectionRangeBehaviorConfig {
  minAngle: number;
  maxAngle: number;
}
```

### Path

TODO

```typescript
interface PathBehaviorConfig {
  path: string;
}
```

## Parameters that change over time

| Behavior | ScalarStaticBehaviorConfig | ScalarDynamicBehaviorConfig | ScriptBehaviorConfig | VectorBehaviorConfig | DeltaBehaviorConfig |
| -------- | -------------------------- | --------------------------- | -------------------- | -------------------- | ------------------- |
| Scale    | Yes                        | Yes                         | Yes                  | Yes                  | No                  |
| Alpha    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Speed    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Color    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Gravity  | Yes                        | Yes                         | No                   | No                   | No                  |
| Rotation | Yes                        | Yes                         | Yes                  | No                   | Yes                 |

### ScalarStaticBehaviorConfig

A static value that will be constant throughout the life of the particle.

```typescript
interface ScalarStaticBehaviorConfig extends ScalarBaseBehaviorConfig {
  value: number;
  easing?: EasingName;
  mult?: Multiplier;
}
```

### ScriptBehaviorConfig

The value is changed according to the prescribed script. You must specify the array as **time - value**. The time is normalized, it varies from 0 to 1, where 0 is the beginning of the particle's life, and 1 is the end.

```typescript
type TimeScriptConfig<V> = {time: number; value: V}[];

interface ScriptBehaviorConfig<V> {
  script: TimeScriptConfig<V>;
}
```

An example where the particle size increases from 1 to 3

```typescript
scale: {
  script: [
    {
      time: 0,
      value: 1,
    },
    {
      time: 0.25,
      value: 2,
    },
    {
      time: 1,
      value: 3,
    },
  ],
}
```

### VectorBehaviorConfig

Applies only to vector values, for example, scale, which varies along both axes.

```typescript
interface VectorBehaviorConfig {
  x: ScalarBehaviorConfig;
  y: ScalarBehaviorConfig;
}
```

### DeltaBehaviorConfig

The value \* mult value changes every frame by the delta constant

```typescript
interface DeltaBehaviorConfig {
  value: number;
  delta: number;
  mult?: Multiplier;
}
```

## Methods

**emitOnce** - Creates the transmitted number of particles, but not more than **maxParticles**. Container update starts

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {autoStart: false}, {lifeTime: {value: 100}});
// Creates 1 particle and starts the emitter, which will work until at least one particle is rendered.
particleFlux.emitOnce();
```

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {autoStart: false, spawnInterval: 100, maxParticles: 100},
  {lifeTime: {value: 100}},
);
// It will create 10 particles and immediately add them to the container, but the total number of particles in the container will not exceed 100
// and the emitter starts, which will work until at least one particle is rendered.
particleFlux.emitOnce(10);
```

**emitWave** - Creates a wave of particles outside the specified interval, but no more than **maxParticles**. Container update starts

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {autoStart: false}, {lifeTime: {value: 100}});
// Creates a particle wave by adding 1 particle to the container, and the emitter starts, which will work until at least one particle is rendered.
particleFlux.emitWave();
```

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {autoStart: false, spawnInterval: 100, maxParticles: 100, spawnParticlesPerWave: 10},
  {lifeTime: {value: 100}},
);
// It will create a wave of 10 particles and immediately add them to the container, but the total number of particles in the container will not exceed 100
// and the emitter starts, which will work until at least one particle is rendered.
particleFlux.emitWave();
```

**startEmit** - The emitter starts working

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {autoStart: false, spawnInterval: 100},
  {lifeTime: {value: 100}},
);
// It starts by adding 1 particle to the container immediately.
particleFlux.startEmit();
```

**pauseEmit** - Pauses the emitter, creating particles, updating rendered ones

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {spawnInterval: 100}, {lifeTime: {value: 100}});
// Pause updating the container and creating the particles
particleFlux.pauseEmit();
// It will resume the emitter and particle movement from the same place.
particleFlux.startEmit();
```

**stopEmit** - Stops the emitter operation, removes all particles, and the emitter state is reset to its original state.

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {spawnInterval: 100}, {lifeTime: {value: 100}});
// stops the emitter
particleFlux.stopEmit();
```

**clean** - Cleaning the particle container

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {spawnInterval: 100}, {lifeTime: {value: 100}});
particleFlux.clean();
particleFlux.getParticlesCount() === 0; // true
```

**isEmitterActive** - Returns true if the emitter is active, i.e. it updates the container and creates new particles.

```typescript
const particleFlux = new ParticleFlux(container, fabricFunction, {spawnInterval: 100}, {lifeTime: {value: 100}});
particleFlux.isEmitterActive(); // true
particleFlux.stopEmit();
particleFlux.isEmitterActive(); // false
```

**updateContainer** - Updates the container

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {spawnInterval: 100, autoStart: false},
  {lifeTime: {value: 100}},
);

const STANDARD_DELTA_MS = 1000 / 60; // 16.6 ms - time between frames at 60 FPS
let lastTime = new Date().getTime();

const update = (): void => {
  const deltaBetweenFrames = new Date().getTime() - lastTime;
  particleFlux.updateContainer(deltaBetweenFrames / STANDARD_DELTA_MS, deltaBetweenFrames);

  lastTime = new Date().getTime();

  window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
```

**getParticlesCount** - The number of active particles that are currently rendered

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {spawnInterval: 100, autoStart: false},
  {lifeTime: {value: 100}},
);
particleFlux.emitOnce(20);
particleFlux.getParticlesCount(); // 20
```

**getParticles** - Returns an array of active particles that implement the IParticle interface.

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {spawnInterval: 100, autoStart: false},
  {lifeTime: {value: 100}},
);
particleFlux.emitOnce(2);
particleFlux.getParticles(); // [Particle, Particle]
```

## Configuration change after emitter creation

After creating an instance of Particle Flux, the configuration values for the emitter and particles can be changed via ConfigManager.

```typescript
const particleFlux = new ParticleFlux(
  container,
  fabricFunction,
  {spawnInterval: 100, maxParticles: 200, autoStart: false},
  {
    lifeTime: {
      value: 100,
    },
    speed: {
      value: 2,
    },
  },
);
particleFlux.config.speed = {
  min: 2,
  max: 4,
};
particleFlux.config.maxParticles = Infinity;
```
