import { expect, test, describe } from 'vitest';
import { defineAppConfig } from '../src/appConfig.js';

describe('AppConfig', () => {
  test('defineAppConfig', () => {
    const appConfig = {};
    expect(defineAppConfig(appConfig)).toEqual(appConfig);
  });

  test('defineAppConfig fn', () => {
    const appConfig = {};
    expect(defineAppConfig(() => appConfig)).toEqual(appConfig);
  });
});
