import * as adapter from './adapter';
import camelCase from 'camelCase';

/**
 * load adpater
 * @param context the current project information
 */
const loadAdapter = (context) => {
  const mods = {};
  for (const [key, Mod] of Object.entries(adapter)) {
    mods[camelCase(key)] = new Mod(context);
  }

  return mods;
};

export default loadAdapter;
