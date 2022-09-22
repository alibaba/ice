import * as path from 'path';
import fse from 'fs-extra';
import type Generator from '../service/runtimeGenerator.js';

type RenderData = {
  loaders: string;
  routesConfig: string;
} & Record<string, any>;

function renderExportsTemplate(
  renderData: RenderData,
  addRenderFile: Generator['addRenderFile'],
  renderOptions: {
    rootDir: string;
    runtimeDir: string;
    templateDir: string;
    dataLoader?: boolean;
  },
) {
  const { rootDir, runtimeDir, templateDir, dataLoader } = renderOptions;

  const renderList: [string, boolean][] = [
    ['data-loader.ts.ejs', dataLoader && (!!renderData.loaders || renderData.hasExportAppData)],
    ['routes-config.ts.ejs', !!renderData.routesConfig],
  ];

  renderList.forEach(([filePath, needRender]) => {
    const targetFilePath = path.join(rootDir, runtimeDir, filePath.replace('.ejs', ''));
    if (needRender) {
      addRenderFile(
        path.join(templateDir, filePath),
        targetFilePath,
        renderData,
      );
    } else if (fse.existsSync(targetFilePath)) {
      fse.removeSync(targetFilePath);
    }
  });
}

export default renderExportsTemplate;