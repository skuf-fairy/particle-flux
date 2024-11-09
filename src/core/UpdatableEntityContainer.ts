import {IUpdatableEntity} from '../types';
import {KeyUniqValuesVault} from '../utils/vaults/KeyUniqValuesVault';

/**
 * Обертка над обновляемыми сущностями
 * Содержит и синхронизирует два массива
 * entityList - весь список обновляемых сущностей
 * updatableEntityMap - список только тех сущностей, у которых реализован метод update
 */
export class UpdatableEntityContainer<K, E extends IUpdatableEntity> implements IUpdatableEntity {
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

  public cloneMap(map: Map<K, E[]>): Map<K, E[]> {
    return new Map(map);
  }

  public getEntityByKey(key: K): E | undefined {
    return this.entityMap.getValue(key);
  }

  public getEntity(key: K, entity: E): E | undefined {
    return this.entityMap.getValue(key, entity);
  }

  public pushEntity(key: K, entity: E): void {
    this.entityMap.addValue(key, entity);
    if (entity.onUpdate) {
      this.updatableEntityMap.addValue(key, entity);
    }
  }

  public dropEntityByKey(key: K): void {
    this.entityMap.dropKey(key).forEach((e) => {
      e.onDestroy?.();
    });

    this.updatableEntityMap.dropKey(key);
  }

  public dropEntity(key: K, entity: E): void {
    this.entityMap.dropSetValue(key, entity).forEach((e) => {
      e.onDestroy?.();
    });

    this.updatableEntityMap.dropSetValue(key, entity);
  }

  public getEntityCount(key: K): number {
    return this.entityMap.getValueCountByKey(key);
  }

  public onUpdate(delta: number): void {
    this.updatableEntityMap.getVault().forEach((e) => e.forEach((e) => e.onUpdate?.(delta)));
  }

  public onDestroy(): void {
    this.entityList.forEach((c) => c.onDestroy?.());
    this.entityMap.clear();
    this.updatableEntityMap.clear();
    this.entityMap = new KeyUniqValuesVault<K, E>();
    this.updatableEntityMap = new KeyUniqValuesVault<K, E>();
  }

  public onPause(): void {
    this.entityList.forEach((c) => c.onPause?.());
  }

  public onResume(): void {
    this.entityList.forEach((c) => c.onResume?.());
  }
}
