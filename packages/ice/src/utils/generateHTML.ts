import * as path from 'path';
import fse from 'fs-extra';
import consola from 'consola';
import type { ServerContext, RenderMode, AppConfig } from '@ice/runtime';
import { ROUTER_MANIFEST } from '../constant.js';
import getRoutePaths from './getRoutePaths.js';
import dynamicImport from './dynamicImport.js';

interface Options {
  rootDir: string;
  entry: string;
  outputDir: string;
  documentOnly: boolean;
  routeType: AppConfig['router']['type'];
  renderMode?: RenderMode;
}

export default async function generateHTML(options: Options) {
  const {
    rootDir,
    entry,
    outputDir,
    documentOnly,
    renderMode,
    routeType,
  } = options;

  let serverEntry;
  try {
    serverEntry = await dynamicImport(entry);
  } catch (err) {
    // make error clearly, notice typeof err === 'string'
    throw new Error(`import ${entry} error: ${err}`);
  }

  // Read the latest routes info.
  const routeManifest = path.join(rootDir, ROUTER_MANIFEST);
  const routes = JSON.parse(fse.readFileSync(routeManifest, 'utf8'));
  // When enable hash-router, only generate one html(index.html).
  const paths = routeType === 'hash' ? ['/'] : getRoutePaths(routes);
  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const htmlContent = await renderHTML({ routePath, serverEntry, documentOnly, renderMode });
    await writeFile(
      await generateHTMLPath({ rootDir, routePath, outputDir }),
      htmlContent,
    );
  }
}

const writeFile = async (file: string, content: string) => {
  await fse.ensureFile(file);
  await fse.writeFile(file, content);
};

async function generateHTMLPath(
  {
    rootDir,
    routePath,
    outputDir,
  }: {
    rootDir: string;
    routePath: string;
    outputDir: string;
  },
) {
  // Win32 do not support file name with
  const fileName = routePath === '/' ? 'index.html' : `${routePath.replace(/\/:/g, '/$')}.html`;
  if (fse.existsSync(path.join(rootDir, 'public', fileName))) {
    consola.warn(`${fileName} is overwrite by framework, rename file name if it is necessary.`);
  }

  return path.join(outputDir, fileName);
}

async function renderHTML(
  {
    routePath,
    serverEntry,
    documentOnly,
    renderMode,
  }: {
    routePath: string;
    serverEntry: any;
    documentOnly: boolean;
    renderMode?: RenderMode;
  },
) {
  const serverContext: ServerContext = {
    req: {
      url: routePath,
    } as any,
  };
  const { value: html } = await serverEntry.renderToHTML(serverContext, {
    renderMode,
    documentOnly,
    routePath,
    serverOnlyBasename: '/',
  });
  return html;
}
