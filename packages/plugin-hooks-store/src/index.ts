import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ applyMethod }) => {
  applyMethod('addExport', {
    source: '@ice/hooks-store',
    specifier: '{ createStore as createHooksStore }',
    importSource: '@ice/hooks-store',
    exportName: 'createHooksStore',
    exportMembers: ['createHooksStore'],
  });
};

export default plugin;
