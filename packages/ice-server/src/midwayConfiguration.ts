import { MidwayConfiguration } from './types';

export const MIDWAY_CONFIGURATION = Symbol.for('midway-configuration');

export function setMidwayConfiguration(configuration: MidwayConfiguration) {
  globalThis[MIDWAY_CONFIGURATION] = configuration;
}

export function getMidwayConfiguration() {
  return globalThis[MIDWAY_CONFIGURATION];
}
