interface IUserConfig {
  babelPlugins: string[];
}

const plugin = ({ applyMethod, modifyUserConfig }) => {
  // add react-activation/babel to add _nk attribute to each jsx element
  modifyUserConfig((userConfig: IUserConfig) => {
    const { babelPlugins = []} = userConfig;
    return {
      babelPlugins: babelPlugins.concat('react-activation/babel'),
    };
  });

  // export react-activation lifecycles from ice
  const exportMembers = [
    'withActivation',
    'fixContext',
    'useActivate',
    'useUnactivate',
    'createContext',
    'withAliveScope',
    'useAliveController',
    'KeepAlive',
    'NodeKey',
  ];
  applyMethod('addExport', {
    source: 'react-activation',
    exportName: exportMembers.join(','),
    specifier: `{ ${exportMembers.join(',')} }`,
    importSource: 'react-activation',
    exportMembers,
  });
};

export default plugin;