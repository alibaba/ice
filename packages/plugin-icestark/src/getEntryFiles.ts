/*
{
  index: [
    '/Users/maoxiaoke/demo-project/icestark-demo/ice-browser-var/child/node_modules/_react-dev-utils@10.2.1@react-dev-utils/webpackHotDevClient.js',
    '/Users/maoxiaoke/demo-project/icestark-demo/ice-browser-var/child/src/app'
  ]
}
*/

/**
 * get Entry file names
 * @param entries
 * @returns
 */
const getEntryFiles = (entries: object): string[] => {
  return Object.keys(entries)
    .reduce((pre, next) => {
      return [
        ...pre,
        ...(Array.isArray(entries[next]) ? entries[next] : [entries[next]])
      ];
    }, []);
};

export default getEntryFiles;
