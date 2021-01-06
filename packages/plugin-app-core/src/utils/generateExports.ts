import { IExportData } from '../types/base';

function generateExports(exportList: IExportData[]) {
  const importStatements = [];
  const exportStatements = [];
  exportList.forEach(data => {
    const { specifier, source, exportName } = data;
    if (exportName) {
      let exportStr = exportName;
      if (source) {
        const symbol = source.includes('types') ? ';' : ',';
        importStatements.push(`import ${specifier || exportName} from '${source}';`);
        exportStr = `${exportName}${symbol}`;
      }
      exportStatements.push(exportStr);
    } else if (source) {
      importStatements.push(`export ${specifier || '*'} from '${source}';`);
    }
  });
  return {
    importStr: importStatements.join('\n'),
    exportStr: exportStatements.join('\n')
  };
}

export default generateExports;
