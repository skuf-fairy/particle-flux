import {describe, expect, it} from 'vitest';
import {ConfigManager} from '../../core/ConfigManager';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';

describe('ConfigManager', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);

  it('Correct initialization', () => {
    expect(configManager.alpha).toEqual(initialConfig.particleConfig.alpha);
    expect(configManager.lifeTime).toEqual(initialConfig.particleConfig.lifeTime);
  });

  it('Changing config values', () => {
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

  it('The immutability of the initial config', () => {
    expect(initialConfig).toEqual(TEST_CONFIG());
  });
});
