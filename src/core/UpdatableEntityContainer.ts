import {KeyUniqValuesVault} from '../utils/vaults/KeyUniqValuesVault';

interface IUpdatableEntity {
  update?(deltaMS: number): void;
  destroy?(): void;
}

/**
 * Обертка над обновляемыми сущностями
 * Содержит и синхронизирует два массива
 * entityList - весь список обновляемых сущностей
 * updatableEntityMap - список только тех сущностей, у которых реализован метод update
 */
export class UpdatableEntityContainer<K, E extends IUpdatableEntity> {
  /**
   * весь список обновляемых сущностей
   */
  public entityMap: KeyUniqValuesVault<K, E>;
  /**
   * список только тех сущностей, у которых реализован метод update
   */
  public updatableEntityMap: KeyUniqValuesVault<K, E>;

  constructor() {
    this.entityMap = new KeyUniqValuesVault<K, E>();
    this.updatableEntityMap = new KeyUniqValuesVault<K, E>();
  }

  get size(): number {
    return this.entityMap.size;
  }

  get entityList(): E[] {
    return this.entityMap.valuesList;
  }

  public getEntityByKey(key: K): E | undefined {
    return this.entityMap.getValue(key);
  }

  public getEntity(key: K, entity: E): E | undefined {
    return this.entityMap.getValue(key, entity);
  }

  public pushEntity(key: K, entity: E): void {
    this.entityMap.addValue(key, entity);
    if (entity.update) {
      this.updatableEntityMap.addValue(key, entity);
    }
  }

  public dropEntityByKey(key: K): void {
    this.entityMap.dropKey(key).forEach((e) => {
      e.destroy?.();
    });

    this.updatableEntityMap.dropKey(key);
  }

  public dropEntity(key: K, entity: E): void {
    this.entityMap.dropSetValue(key, entity).forEach((e) => {
      e.destroy?.();
    });

    this.updatableEntityMap.dropSetValue(key, entity);
  }

  public getEntityCount(key: K): number {
    return this.entityMap.getValueCountByKey(key);
  }

  public update(delta: number): void {
    this.updatableEntityMap.getVault().forEach((e) => e.forEach((e) => e.update?.(delta)));
  }

  public destroy(): void {
    this.entityList.forEach((c) => c.destroy?.());
    this.entityMap.clear();
    this.updatableEntityMap.clear();
    this.entityMap = new KeyUniqValuesVault<K, E>();
    this.updatableEntityMap = new KeyUniqValuesVault<K, E>();
  }
}
