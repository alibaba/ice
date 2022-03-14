export default ({ applyMethod }) => {
  applyMethod('addExport', {
    source: 'react-helmet',
    specifier: '{ Helmet }',
    exportName: `
    Helmet as Head,
    // @deprecated
    Helmet`,
    importSource: 'react-helmet',
    exportMembers: ['Helmet'],
    alias: {
      'Head': 'Helmet'
    }
  });
};
