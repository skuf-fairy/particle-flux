import {IParticle, IParticleComponent, IParticleContainer, IVector2, ViewParticle} from '../types';
import {UnknownConstructor} from '../types.utils';
import {UpdatableEntityContainer} from './UpdatableEntityContainer';
import {Vector2} from 'src/utils/Vector2';

export class Particle extends UpdatableEntityContainer<Function, IParticleComponent> implements IParticle {
  /**
   * Мир, в котором находится игровой объект
   * Если он null, то почему-то не привязан к миру, возможно, из-за утечки памяти
   */
  public container: IParticleContainer;
  public view: ViewParticle;
  public speed: number;
  public direction: IVector2;
  public shouldDestroy: boolean;

  constructor(view: ViewParticle, container: IParticleContainer) {
    super();

    this.container = container;
    this.view = view;
    this.speed = 0;
    this.direction = new Vector2();
    this.shouldDestroy = false;
  }

  public init(): void {
    this.container.viewContainer.addChild(this.view);
    this.entityList.forEach((e) => e.init());
  }

  public onUpdate(delta: number): void {
    if (this.view.isDestroyed) {
      this.shouldDestroy = true;
      return;
    }

    super.onUpdate(delta);
  }

  public onDestroy(): void {
    super.onDestroy();
    this.container.viewContainer.removeChild(this.view);
  }

  /**
   * Добавление компонентов в игровой объект
   * @param componentList список инстансов игровых компонентов
   */
  public addComponent(...componentList: IParticleComponent[]): void {
    componentList.forEach((component) => {
      this.pushEntity(component.constructor, component);
      component.bindParticle(this);
    });
  }

  /**
   * Удалить компонент из игрового объекта
   * @param component класс компонента
   */
  public removeComponent(component: UnknownConstructor<IParticleComponent>): void {
    this.dropEntityByKey(component);
  }

  /**
   * Получить инстанс компонента игрового объекта
   * @param component ссылка на класс-компонент
   * @returns инстанс компонента либо undefined, если такого компонента нет в игровом объекте
   */
  public getComponent<T extends IParticleComponent>(component: UnknownConstructor<IParticleComponent>): T | undefined {
    return this.getEntityByKey(component) as T | undefined;
  }

  public getComponentByTag<T extends IParticleComponent>(tag: string): T | undefined {
    return this.entityList.find((e) => e.tag === tag) as T | undefined;
  }
}
