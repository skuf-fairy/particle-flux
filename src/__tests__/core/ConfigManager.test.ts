import {describe, expect, it} from 'vitest';
import {ConfigManager} from '../../core/ConfigManager';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';

describe('ConfigManager', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);

  it('Корректная инициализация', () => {
    expect(configManager.alpha).toEqual(initialConfig.particleBehaviorsConfig.alpha);
    expect(configManager.lifeTime).toEqual(initialConfig.particleBehaviorsConfig.lifeTime);
  });

  it('Изменение значений конфига', () => {
    configManager.scale = {
      start: 0,
      end: 1,
    };
    configManager.color = {
      value: '#ffffff',
    };

    expect(configManager.scale).toEqual(configManager.scale);
    expect(configManager.color).toEqual(configManager.color);
  });

  it('Иммутабельность изначального конфига', () => {
    expect(initialConfig).toEqual(TEST_CONFIG());
  });
});
