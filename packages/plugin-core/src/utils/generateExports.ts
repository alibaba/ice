import { IExportData } from '../types';

function generateExports(exportList: IExportData[]) {
  const importStatements = [];
  const exportStatements = [];
  exportList.forEach(data => {
    const { specifier, source, exportName } = data;
    if (exportName && source) {
      const symbol = source.includes('types') ? ';' : ',';
      importStatements.push(`import ${specifier || exportName} from '${source}';`);
      exportStatements.push(`${exportName}${symbol}`);
    } else if(source) {
      importStatements.push(`export * from '${source}';`);
    }
  });
  return {
    importStr: importStatements.join('\n'),
    exportStr: exportStatements.join('\n'),
  };
}

export default generateExports;
