# Particle Flux

Система частиц для различных графических библиотек на языке JavaScript.

Интерактивный редактор для конфигурации конфига для эмиттера. TODO

## Particle Emitter Config

Конфигурация эмиттера частиц, который отвечает за создание частиц

`typescript
interface EmitterConfig {
  spawnInterval?: NumberValue;
  spawnTime?: number;
  maxParticles?: number;
  spawnParticlesPerWave?: number;
  spawnChance?: number;
  autoStart?: boolean;
}
`

### Spawn Interval

Определяет с какой частотой будет создаваться волна частиц. Указывается в миллисекундах. Если не указать, то эмиттер будет работать в режиме ожидания и спавнить частицы нужно с помощью методов **emitOnce** и **emitWave**
Может быть как постоянной, например, если указать 250 мс, то каждые 250 мс (как минимум, если позволит браузер) будет создаваться волна частиц.
Так же этот параметр можно указать в формате диапазона:

`typescript
type RangeValue = {
  min: number;
  max: number;
};
`

тогда следующее создание волны частиц будет через случайное время в диапазоне от **min** до **max** включительно.

### Spawn Time

Определяет время работы эмиттера. Указывается в миллисекундах. Если не указать, то эмиттер будет бесконечно спавнить частицы (если конечно был указан **Spawn Interval**)

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

`typescript
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
`

### Life Time

Определяет время жизни частицы. Обязательное поле. Указывается в миллисекундах.
Параметры, которые меняются со временем меняются относительно времени жизни частицы.
Может быть статичным, то есть время жизни каждой созданной частицы будет всегда одинаковым.

`typescript
interface LifeTimeStaticBehaviorConfig {
  value: number;
}
`

Если передать диапазон, то время жизни созданной частицы будет варьироваться в диапазоне от **min** до **max**

`typescript
interface LifeTimeRangeBehaviorConfig {
  min: number;
  max: number;
}
`

### Spawn Position

Определяет начальную позицию частицы либо, если указан **Spawn Shape**, то позицию относительно которой рассчитывается позиция с помощью конфига в **Spawn Shape**. По умолчанию это начало координат.

`typescript
interface SpawnPositionBehaviorConfig {
  x: number;
  y: number;
}
`

### Spawn Shape

Определяет область, в которой может создаться частица. Область может быть одной из следующих конфигураций.

#### Point Spawn Shape

Область для создания частицы - точка.

`typescript
interface SpawnPointShape {
  type: SpawnShapeType.Point;
  x: number;
  y: number;
}
`

#### Rectangle Spawn Shape

Область для создания частицы - прямоугольник, параллельный оси Х.

`typescript
interface SpawnRectangleShape {
  type: SpawnShapeType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
}
`

#### Circle Spawn Shape

Область для создания частицы - круг.

`typescript
interface SpawnCircleShape {
  type: SpawnShapeType.Circle;
  x: number;
  y: number;
  radius: number;
}
`

#### Polygonal Chain Spawn Shape

Область для создания частицы - линия полигона.

`typescript
interface Point2d {
x: number;
y: number;
}

type Chain = Point2d[];

interface PolygonalChainShape {
type: SpawnShapeType.Polygon;
chain: Chain | Chain[];
}
`

Chain[] - разделенные полигоны

### Direction

Определяет направление движения частицы. Измеряется в градусах.

Может быть статичным, тогда каждая частица будет двигаться в этом направлении

`typescript
interface StaticDirectionBehaviorConfig {
  angle: number;
}
`

Можно передать диапазон, тогда направление движения частицы будет случайное в этом диапазоне

`typescript
interface DirectionRangeBehaviorConfig {
  minAngle: number;
  maxAngle: number;
}
`

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

`typescript
interface ScalarStaticBehaviorConfig extends ScalarBaseBehaviorConfig {
  value: number;
  easing?: EasingName;
  mult?: Multiplier;
}
`

## Использование на примере pixi.js

TODO
