function checkExportData(currentList, exportData, apiName) {
  (Array.isArray(exportData) ? exportData : [exportData]).forEach((data) => {
    currentList.forEach(({ specifier, exportName }) => {
      // check exportName and specifier
      if (specifier || exportName) {
        const defaultSpecifierName = specifier || exportName;
        if ((exportName && exportName === data.exportName) || defaultSpecifierName === data.specifier) {
          throw new Error(`duplicate export data added by ${apiName},
            ${data.exportName ? `exportName: ${data.exportName}, ` : ''}specifier: ${data.specifier}
          `);
        }
      }
    });
  });
}

export default checkExportData;
