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
      // The type of `entries` is type ChainedMap, get values by values()
      const value = entries[next].values();
      return [
        ...pre,
        ...(Array.isArray(value) ? value : [value])
      ];
    }, []);
};

/**
 * Get the latest value when running spa
 */
export const getEntryForSPA = (entries: object) => {
  return getEntryFiles(entries).slice(-1)[0];
};
