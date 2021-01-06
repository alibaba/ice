export default ({ applyMethod }) => {
  applyMethod('addExport', {
    source: 'react-helmet',
    specifier: '{ Helmet }',
    exportName: 'Helmet',
    importSource: 'react-helmet',
    exportMembers: ['Helmet'],
  });
};
