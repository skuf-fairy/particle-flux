# Particle Flux

Система частиц для различных графических библиотек на языке JavaScript.

Интерактивный редактор для конфигурации конфига для эмиттера. TODO

## Interactive Examples

Примеры некоторых анимация и эффектов, которые можно создать с помощью эмиттера. Во всех примерах используется [pixi.js](https://www.npmjs.com/package/pixi.js), но все они могут быть выполнены на любой другой библиотеке для визуализации на канвасе.

- [Pulse](https://codepen.io/vladosina/pen/OPLGQyG?editors=1100)

## Particle Emitter Config

Конфигурация эмиттера частиц, который отвечает за создание частиц

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

Определяет с какой частотой будет создаваться волна частиц. Указывается в миллисекундах. Если не указать, то эмиттер будет работать в режиме ожидания и спавнить частицы нужно с помощью методов **emitOnce** и **emitWave**
Может быть как постоянной, например, если указать 250 мс, то каждые 250 мс (как минимум, если позволит браузер) будет создаваться волна частиц.
Так же этот параметр можно указать в формате диапазона:

```typescript
type RangeValue = {
  min: number;
  max: number;
};
```

тогда следующее создание волны частиц будет через случайное время в диапазоне от **min** до **max** включительно.

### Spawn Time

Определяет время работы эмиттера. Указывается в миллисекундах. Если не указать, то эмиттер будет бесконечно спавнить частицы (если конечно был указан **Spawn Interval**)

### Spawn Timeout

Таймаут до первого создания волны частиц

### Max Particles

Определяет максимальное количество частиц, которые одновременно находятся в контейнере. По умолчанию нет ограничений.

### Spawn Particles Per Wave

Определяется сколько частиц за волну будет создано, но не более чем **Max Particles**. По умолчанию равен **1**.

### Spawn Chance

Определяет шанс создания частицы. Значение от **0** до **100**. По умолчанию равен **100**

### Autostart

Определяет автостарт эмиттера, то есть создания частиц. По умолчанию **true**

## Particle Behavior Config

Конфигурация для каждой частицы, которая определяет ее начальное положение, направление движения, скорость и другие параметры для ее отображения.

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

Определяет время жизни частицы. Обязательное поле. Указывается в миллисекундах.
Параметры, которые меняются со временем меняются относительно времени жизни частицы.
Может быть статичным, то есть время жизни каждой созданной частицы будет всегда одинаковым.

```typescript
interface LifeTimeStaticBehaviorConfig {
  value: number;
}
```

Если передать диапазон, то время жизни созданной частицы будет варьироваться в диапазоне от **min** до **max**

```typescript
interface LifeTimeRangeBehaviorConfig {
  min: number;
  max: number;
}
```

### Spawn Position

Определяет начальную позицию частицы либо, если указан **Spawn Shape**, то позицию относительно которой рассчитывается позиция с помощью конфига в **Spawn Shape**. По умолчанию это начало координат.

```typescript
interface SpawnPositionBehaviorConfig {
  x: number;
  y: number;
}
```

### Spawn Shape

Определяет область, в которой может создаться частица. Область может быть одной из следующих конфигураций.

#### Point Spawn Shape

Область для создания частицы - точка.

```typescript
interface SpawnPointShape {
  type: SpawnShapeType.Point;
  x: number;
  y: number;
}
```

#### Rectangle Spawn Shape

Область для создания частицы - прямоугольник, параллельный оси Х.

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

Область для создания частицы - линия полигона.

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

Chain[] - разделенные полигоны

### Direction

Определяет направление движения частицы. Измеряется в градусах.

Может быть статичным, тогда каждая частица будет двигаться в этом направлении

```typescript
interface StaticDirectionBehaviorConfig {
  angle: number;
}
```

Можно передать диапазон, тогда направление движения частицы будет случайное в этом диапазоне

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

## Параметры, которые меняются со временем

| Behavior | ScalarStaticBehaviorConfig | ScalarDynamicBehaviorConfig | ScriptBehaviorConfig | VectorBehaviorConfig | DeltaBehaviorConfig |
| -------- | -------------------------- | --------------------------- | -------------------- | -------------------- | ------------------- |
| Scale    | Yes                        | Yes                         | Yes                  | Yes                  | No                  |
| Alpha    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Speed    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Color    | Yes                        | Yes                         | Yes                  | No                   | No                  |
| Gravity  | Yes                        | Yes                         | No                   | No                   | No                  |
| Rotation | Yes                        | Yes                         | Yes                  | No                   | Yes                 |

### ScalarStaticBehaviorConfig

Статичное значение, которое будет постоянным на протяжении всей жизни частицы

```typescript
interface ScalarStaticBehaviorConfig extends ScalarBaseBehaviorConfig {
  value: number;
  easing?: EasingName;
  mult?: Multiplier;
}
```

### ScriptBehaviorConfig

Значение изменяется по прописанному скрипту. Необходимо указать массив в виде **время - значение**. Время нормализованное, изменяется от 0 до 1, где 0 - это начало жизни частицы, 1 - это конец.

```typescript
type TimeScriptConfig<V> = {time: number; value: V}[];

interface ScriptBehaviorConfig<V> {
  script: TimeScriptConfig<V>;
}
```

Пример, где размер частицы увеличивается от 1 до 3

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

Применимо только к векторным значениям, например, scale, который изменяется по обеим осям.

```typescript
interface VectorBehaviorConfig {
  x: ScalarBehaviorConfig;
  y: ScalarBehaviorConfig;
}
```

### DeltaBehaviorConfig

Значение value \* mult изменяется каждый кадр на константу delta

```typescript
interface DeltaBehaviorConfig {
  value: number;
  delta: number;
  mult?: Multiplier;
}
```

## Использование на примере pixi.js 8 версии

Простой пример использования эмиттера

```typescript
import {ParticleFlux} from 'particle-flux';
import {Application, Assets, Sprite} from 'pixi.js';

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
new ParticleFlux(app.stage, createParticle, {
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
```
