import { formatPath } from '@builder/app-helpers';
/*
{
  index: [
    '/icestark-demo/ice-browser-var/child/node_modules/_react-dev-utils@10.2.1@react-dev-utils/webpackHotDevClient.js',
    '/demo-project/icestark-demo/ice-browser-var/child/src/app'
  ]
}
*/

/**
 * get Entry file names
 * @param entries ChainedMap
 * @returns
 */
export const getEntryFiles = (entries: object): string[] => {
  return Object.keys(entries)
    .reduce((pre, next) => {
      // The type of `entries` is ChainedMap, get values by values()
      const value = entries[next].values();
      const formatedValue = formatPath((Array.isArray(value) ? value.slice(-1)[0] : value));
      return [
        ...pre,
        formatedValue
      ];
    }, []);
};

export const getEntries = (entries: object) => {
  return Object.keys(entries)
    .reduce((pre, next) => {
      const value = entries[next].values();
      const formatedValue = formatPath((Array.isArray(value) ? value.slice(-1)[0] : value));
      return {
        ...pre,
        [next]: formatedValue,
      };
    }, {});
};
