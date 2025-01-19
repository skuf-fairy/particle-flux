import {KeyUniqValuesVault} from '../utils/vaults/KeyUniqValuesVault';
import {IParticle, IParticleComponent, Point2d, ViewParticle} from '../types';
import {UnknownConstructor} from '../types.utils';

/*
 * Класс-контейнер для компонентов и поведений частицы
 */
export class Particle implements IParticle {
  // отображение частицы, определяется извне
  // может быть спрайтом из pixi.js, HTML элементом и прочим
  public view: ViewParticle;
  // скорость движения частицы
  public speed: number;
  // направление движения в двумерном пространстве
  public direction: Point2d;
  // нужно ли дропнуть частицу из контейнера после обновления контейнера
  public shouldDestroy: boolean;

  public componentsMap: KeyUniqValuesVault<Function, IParticleComponent>;
  /**
   * список только тех сущностей, у которых реализован метод update
   */
  public updatableComponentsMap: KeyUniqValuesVault<Function, IParticleComponent>;

  constructor(view: ViewParticle) {
    this.componentsMap = new KeyUniqValuesVault<Function, IParticleComponent>();
    this.updatableComponentsMap = new KeyUniqValuesVault<Function, IParticleComponent>();

    this.view = view;
    this.speed = 0;
    this.direction = {
      x: 0,
      y: 0,
    };
    this.shouldDestroy = false;
  }

  // инициализация параметров частицы через компоненты
  public init(): void {
    this.componentsMap.valuesList.forEach((e) => e.init());
  }

  public update(elapsedDelta: number, deltaMS: number): void {
    if (this.view.destroyed) {
      this.shouldDestroy = true;
      return;
    }

    this.updatableComponentsMap.getVault().forEach((e) => e.forEach((e) => e.update?.(elapsedDelta, deltaMS)));
  }

  public destroy(): void {
    this.componentsMap.valuesList.forEach((c) => c.destroy?.());
    this.componentsMap.clear();
    this.updatableComponentsMap.clear();
  }

  /**
   * Добавление компонентов в частицу
   * @param componentList список инстансов компонентов
   */
  public addComponent(...componentList: IParticleComponent[]): void {
    componentList.forEach((component) => {
      this.componentsMap.addValue(component.constructor, component);
      if (component.update) {
        this.updatableComponentsMap.addValue(component.constructor, component);
      }
      component.bindParticle(this);
    });
  }

  /**
   * Удалить компонент из частицы
   * @param component класс компонента
   */
  public removeComponent(component: UnknownConstructor<IParticleComponent>): void {
    this.componentsMap.dropKey(component).forEach((e) => {
      e.destroy?.();
    });

    this.updatableComponentsMap.dropKey(component);
  }

  /**
   * Получить инстанс компонента частицы
   * @param component ссылка на класс-компонент
   * @returns инстанс компонента либо undefined, если такого компонента нет у частицы
   */
  public getComponent<T extends IParticleComponent>(component: UnknownConstructor<IParticleComponent>): T | undefined {
    return this.componentsMap.getValue(component) as T | undefined;
  }

  public componentsCount(): number {
    return this.componentsMap.size;
  }
}
