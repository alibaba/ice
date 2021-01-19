const plugin = ({ applyMethod }) => {
  // export react-activation lifecycles from ice
  const exportMembers = [
    'withActivation',
    'fixContext',
    'useActivate',
    'useUnactivate',
    'createContext',
    'withAliveScope',
    'useAliveController',
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