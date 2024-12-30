import {IParticle, IParticleComponent, IParticleContainer, Point2d, ViewParticle} from '../types';
import {UnknownConstructor} from '../types.utils';
import {UpdatableEntityContainer} from './UpdatableEntityContainer';

/*
 * Класс-контейнер для компонентов и поведений частицы
 */
export class Particle extends UpdatableEntityContainer<Function, IParticleComponent> implements IParticle {
  // Контейнер, в котором находятся частицы
  public container: IParticleContainer;
  // параметры частицы
  // отображение частицы, определяется извне
  // может быть спрайтом из pixi.js, HTML элементом и прочим
  public view: ViewParticle;
  // скорость движения частицы
  public speed: number;
  // направление движения в двумерном пространстве
  public direction: Point2d;
  // нужно ли дропнуть частицу из контейнера после обновления контейнера
  public shouldDestroy: boolean;

  constructor(view: ViewParticle, container: IParticleContainer) {
    super();

    this.container = container;
    this.view = view;
    this.speed = 0;
    this.direction = {
      x: 0,
      y: 0,
    };
    this.shouldDestroy = false;
  }

  // инициализация параметров частицы
  public init(): void {
    this.entityList.forEach((e) => e.init());
  }

  public onUpdate(delta: number): void {
    if (this.view.destroyed) {
      this.shouldDestroy = true;
      return;
    }

    super.onUpdate(delta);
  }

  /**
   * Добавление компонентов в частицу
   * @param componentList список инстансов компонентов
   */
  public addComponent(...componentList: IParticleComponent[]): void {
    componentList.forEach((component) => {
      this.pushEntity(component.constructor, component);
      component.bindParticle(this);
    });
  }

  /**
   * Удалить компонент из частицы
   * @param component класс компонента
   */
  public removeComponent(component: UnknownConstructor<IParticleComponent>): void {
    this.dropEntityByKey(component);
  }

  /**
   * Получить инстанс компонента частицы
   * @param component ссылка на класс-компонент
   * @returns инстанс компонента либо undefined, если такого компонента нет у частицы
   */
  public getComponent<T extends IParticleComponent>(component: UnknownConstructor<IParticleComponent>): T | undefined {
    return this.getEntityByKey(component) as T | undefined;
  }

  /**
   * Получить инстанс компонента частицы по ее тегу
   * @param component ссылка на класс-компонент
   * @returns инстанс компонента либо undefined, если такого компонента нет у частицы
   */
  public getComponentByTag<T extends IParticleComponent>(tag: string): T | undefined {
    return this.entityList.find((e) => e.tag === tag) as T | undefined;
  }
}
