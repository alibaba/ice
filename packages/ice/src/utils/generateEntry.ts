import * as path from 'path';
import fse from 'fs-extra';
import consola from 'consola';
import type { ServerContext, RenderMode, AppConfig, DistType } from '@ice/runtime';
import getRoutePaths from './getRoutePaths.js';
import dynamicImport from './dynamicImport.js';
import { logger } from './logger.js';
import getRouterManifest from './getRouterManifest.js';

interface Options {
  rootDir: string;
  entry: string;
  outputDir: string;
  documentOnly: boolean;
  routeType: AppConfig['router']['type'];
  renderMode?: RenderMode;
  distType: DistType;
}

interface EntryResult {
  outputPaths: Array<string>;
}

export default async function generateEntry(options: Options): Promise<EntryResult> {
  const {
    rootDir,
    entry,
    outputDir,
    documentOnly,
    renderMode,
    routeType,
    distType,
  } = options;

  let serverEntry;
  try {
    serverEntry = await dynamicImport(entry);
  } catch (err) {
    // make error clearly, notice typeof err === 'string'
    throw new Error(`import ${entry} error: ${err}`);
  }

  // Read the latest routes info.
  const routes = getRouterManifest(rootDir);
  // When enable hash-router, only generate one html(index.html).
  const paths = routeType === 'hash' ? ['/'] : getRoutePaths(routes);
  const outputPaths = [];
  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const {
      htmlOutput,
      jsOutput,
    } = await renderEntry({ routePath, serverEntry, documentOnly, renderMode, distType });

    if (htmlOutput) {
      const path = await generateHTMLPath({ rootDir, routePath, outputDir });
      await writeFile(
        path,
        htmlOutput,
      );
      outputPaths.push(path);
    }

    if (jsOutput) {
      const path = await generateJSPath({ rootDir, routePath, outputDir });
      await writeFile(
        path,
        jsOutput,
      );
      outputPaths.push(path);
    }
  }

  return {
    outputPaths,
  };
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
    logger.warn(`${fileName} is overwrite by framework, rename file name if it is necessary.`);
  }

  return path.join(outputDir, fileName);
}

async function generateJSPath(
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
  const fileName = routePath === '/' ? 'index.js' : `${routePath.replace(/\/:/g, '/$')}.js`;
  if (fse.existsSync(path.join(rootDir, 'public', fileName))) {
    consola.warn(`${fileName} is overwrite by framework, rename file name if it is necessary.`);
  }

  return path.join(outputDir, fileName);
}

async function renderEntry(
  {
    routePath,
    serverEntry,
    documentOnly,
    distType = ['html'],
    renderMode,
  }: {
    routePath: string;
    serverEntry: any;
    documentOnly: boolean;
    distType?: DistType;
    renderMode?: RenderMode;
  },
) {
  const serverContext: ServerContext = {
    req: {
      url: routePath,
    } as any,
  };

  // renderToEntry exported when disType includes javascript .
  const render = (distType && distType.includes('javascript') || distType === 'javascript') ? serverEntry.renderToEntry : serverEntry.renderToHTML;

  const {
    value,
    jsOutput,
  } = await render(serverContext, {
    renderMode,
    documentOnly,
    routePath,
    serverOnlyBasename: '/',
    distType,
  });

  return {
    htmlOutput: value,
    jsOutput,
  };
}
