import {ViewContainer, ViewParticle} from '../types';

export class ParticleViewContainer<View extends ViewParticle> {
  private addMethod: (child: View) => void;
  private removeMethod: (child: View) => void;

  constructor(viewContainer: ViewContainer<View>) {
    this.addMethod = this.getAddMethod(viewContainer);
    this.removeMethod = this.getRemoveMethod(viewContainer);
  }

  public add(child: View): void {
    this.addMethod(child);
  }

  public remove(child: View): void {
    this.removeMethod(child);
  }

  private getAddMethod(viewContainer: ViewContainer<View>): (child: View) => void {
    if ('addChild' in viewContainer) {
      return (view: View) => viewContainer.addChild(view);
    }
    if ('addParticle' in viewContainer) {
      return (view: View) => viewContainer.addParticle(view);
    }
    if ('append' in viewContainer) {
      return (view: View) => viewContainer.append(view);
    }

    throw new Error('Не удалось определить метод добавления частицы у контейнера');
  }

  private getRemoveMethod(viewContainer: ViewContainer<View>): (child: View) => void {
    if ('removeChild' in viewContainer) {
      return (view: View) => viewContainer.removeChild(view);
    }
    if ('removeParticle' in viewContainer) {
      return (view: View) => viewContainer.removeParticle(view);
    }
    if ('remove' in viewContainer) {
      return (view: View) => viewContainer.remove(view);
    }

    throw new Error('Не удалось определить метод удаления частицы у контейнера');
  }
}
