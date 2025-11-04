import {describe, expect, it} from 'vitest';
import {ShapePointGenerator} from '../../../core/spawn-shapes/ShapePointGenerator';
import {cloneDeep} from '../../../utils/cloneDeep';

describe('ShapePointGenerator', () => {
  it('Частицы создаются в разных точках', () => {
    const shapePointGenerator = new ShapePointGenerator();
    const point1 = cloneDeep(
      shapePointGenerator.getShapeRandomPoint({
        type: 'Rectangle',
        x: 0,
        y: 0,
        width: 10000,
        height: 10000,
      }),
    );
    const point2 = cloneDeep(
      shapePointGenerator.getShapeRandomPoint({
        type: 'Rectangle',
        x: 0,
        y: 0,
        width: 10000,
        height: 10000,
      }),
    );

    expect(point1.x).not.toEqual(point2.x);
    expect(point1.y).not.toEqual(point2.y);
  });

  it('Обе частицы создаются в одной и той же точке', () => {
    const shapePointGenerator = new ShapePointGenerator();
    const point1 = shapePointGenerator.getShapeRandomPoint({
      type: 'Rectangle',
      x: 0,
      y: 0,
      width: 10000,
      height: 10000,
    });
    shapePointGenerator.reset();
    const point2 = shapePointGenerator.getShapeRandomPoint({
      type: 'Rectangle',
      x: 0,
      y: 0,
      width: 10000,
      height: 10000,
    });

    expect(point1.x).toEqual(point2.x);
    expect(point1.y).toEqual(point2.y);
  });
});
