import {KeyUniqValuesVault} from '../utils/vaults/KeyUniqValuesVault';
import {IParticle, IParticleComponent, Point2d, ViewParticle} from '../types';
import {UnknownConstructor} from '../types.utils';

/*
 * A container class for components and behaviors of a particle
 */
export class Particle implements IParticle {
  // particle display
  public view: ViewParticle;
  // particle velocity
  public speed: number;
  // the direction of movement in two-dimensional space
  public direction: Point2d;
  // do I need to remove the particle from the container after updating the container
  public shouldDestroy: boolean;
  // particle components
  public componentsMap: KeyUniqValuesVault<Function, IParticleComponent>;
  // a list of only those entities that have the update method implemented
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

  // initialization of particle parameters through components
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
   * Adding components to a particle
   * @param componentList list of component instances
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
   * Remove a component from a particle
   * @param component link to the component class
   */
  public removeComponent(component: UnknownConstructor<IParticleComponent>): void {
    this.componentsMap.dropKey(component).forEach((e) => {
      e.destroy?.();
    });

    this.updatableComponentsMap.dropKey(component);
  }

  /**
   * Get an instance of the particle component
   * @param component link to the component class
   * @returns the instance of the component is either undefined if the particle does not have such a component.
   */
  public getComponent<T extends IParticleComponent>(component: UnknownConstructor<IParticleComponent>): T | undefined {
    return this.componentsMap.getValue(component) as T | undefined;
  }

  public componentsCount(): number {
    return this.componentsMap.size;
  }
}
