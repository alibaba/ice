function removeExportData(exportList, removeExportName: string | string[]) {
  const removeExportNames = Array.isArray(removeExportName) ? removeExportName : [removeExportName];
  return exportList.filter(({ exportName, specifier }) => {
    const needRemove = removeExportNames.includes(exportName)
      || !exportName && removeExportNames.includes(specifier);
    return !needRemove;
  });
}

export default removeExportData;