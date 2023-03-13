import * as path from 'path';
import fse from 'fs-extra';
import type { ServerContext, RenderMode, AppConfig, DistType } from '@ice/runtime';
import type { UserConfig } from '../types/userConfig.js';
import dynamicImport from './dynamicImport.js';
import { logger } from './logger.js';
import type RouteManifest from './routeManifest.js';

interface Options {
  rootDir: string;
  entry: string;
  outputDir: string;
  documentOnly: boolean;
  routeType: AppConfig['router']['type'];
  renderMode?: RenderMode;
  distType: UserConfig['output']['distType'];
  routeManifest: RouteManifest;
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
    routeManifest,
  } = options;

  const distType = typeof options.distType === 'string' ? [options.distType] : options.distType;

  let serverEntry;
  try {
    serverEntry = await dynamicImport(entry);
  } catch (err) {
    // Tip the procedure of error stack.
    console.error(`Error occurred while importing ${entry}`);
    throw err;
  }

  // When enable hash-router, only generate one html(index.html).
  const paths = routeType === 'hash' ? ['/'] : routeManifest.getFlattenRoute();
  const outputPaths = [];
  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const {
      htmlOutput,
      jsOutput,
    } = await renderEntry({ routePath, serverEntry, documentOnly, renderMode, distType });
    const generateOptions = { rootDir, routePath, outputDir };
    if (htmlOutput) {
      const path = await generateFilePath({ ...generateOptions, type: 'html' });
      await writeFile(
        path,
        htmlOutput,
      );
      outputPaths.push(path);
    }

    if (jsOutput) {
      const path = await generateFilePath({ ...generateOptions, type: 'js' });
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

function formatFilePath(routePath: string, type: 'js' | 'html'): string {
  // Win32 do not support file name start with ':' and '*'.
  return routePath === '/' ? `index.${type}` : `${routePath.replace(/\/(:|\*)/g, '/$')}.${type}`;
}

async function generateFilePath(
  {
    rootDir,
    routePath,
    outputDir,
    type,
  }: {
    rootDir: string;
    routePath: string;
    outputDir: string;
    type: 'js' | 'html';
  },
) {
  const fileName = formatFilePath(routePath, type);
  if (fse.existsSync(path.join(rootDir, 'public', fileName))) {
    logger.warn(`${fileName} is overwrite by framework, rename file name if it is necessary.`);
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
  const render = distType.includes('javascript') ? serverEntry.renderToEntry : serverEntry.renderToHTML;

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
