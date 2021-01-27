export default ({ applyMethod }) => {
  applyMethod('addExport', {
    source: 'react-helmet',
    specifier: '{ Helmet }',
    exportName: `
    Helmet as Head,
    // @deprecated
    Helmet`,
    importSource: 'react-helmet',
    exportDefault: 'Head'
  });
};
