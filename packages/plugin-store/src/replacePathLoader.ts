import * as path from 'path';
import * as fse from 'fs-extra';
import { redirectImport, formatPath } from '@builder/app-helpers';
import { getOptions } from 'loader-utils';
import { SourceMap } from 'module';

const LAYOUT_DIR = 'Layout';

export default function (content: string, sourceMap: SourceMap) {
  // async loader
  const callback = this.async();
  this.cacheable();

  loader.call(this, content, sourceMap).then(
    args => callback(null, ...args),
    (err: Error) => callback(err),
  );
}

async function loader(content: string, sourceMap: SourceMap) {
  const { alias, tempDir, srcPath, rootDir, routesPaths, applyMethod } = getOptions(this);
  const currentRoutesPath = this.resourcePath;
  if (!routesPaths.includes(currentRoutesPath)) {
    // if this.resourcePath is htmlWebpackPluginPublicPath, skip it
    return [content, sourceMap];
  }
  // ensure get the latest pages value
  const pagesName: string[] = applyMethod('getPages', srcPath);

  // eslint-disable-next-line no-restricted-syntax
  for (const pageName of pagesName) {
    const absolutePagePath = path.join(rootDir, 'src', 'pages', pageName);
    const absolutePageLayoutPath = path.join(absolutePagePath, LAYOUT_DIR);

    const source = (originSourcePath: string) => {
      const originSourceBasename = path.basename(originSourcePath);
      if (['index', 'index.js', 'index.jsx', 'index.tsx'].includes(originSourceBasename)) {
        // ./pages/Home/index[.js|.jsx|.tsx] -> ./pages/Home
        originSourcePath = path.dirname(originSourcePath);
      }
      let matchAliasKey = '';
      Object.keys(alias).forEach((aliasKey: string) => {
        if (new RegExp(aliasKey).test(originSourcePath)) {
          matchAliasKey = aliasKey;
        }
      });

      let absoluteSourcePath: string;
      if (matchAliasKey) {
        // handle alias path
        const matchAliasPath: string = alias[matchAliasKey];
        if (originSourcePath === matchAliasKey) {
          absoluteSourcePath = matchAliasPath;
        } else if (originSourcePath.startsWith(addLastSlash(matchAliasKey))) {
          // e.g.: @/pages/Home -> /users/src/pages/Home
          absoluteSourcePath = originSourcePath.replace(RegExp(`^${matchAliasKey}`), matchAliasPath);
        }
      } else {
        // handle relative path
        const currentRoutesDir = path.dirname(currentRoutesPath);
        absoluteSourcePath = path.join(currentRoutesDir, originSourcePath);
      }

      return [absolutePagePath, absolutePageLayoutPath].includes(absoluteSourcePath);
    };

    // eslint-disable-next-line no-await-in-loop
    content = await redirectImport(content, {
      source,
      redirectImports: [
        {
          redirectPath: generateRedirectPath({ tempDir, pageName, rootDir }),
          default: true,
        }
      ]
    });
  }

  return [content, sourceMap];
}

function generateRedirectPath({ tempDir, pageName, rootDir }) {
  if (fse.pathExistsSync(path.join(rootDir, 'src', 'pages', pageName, LAYOUT_DIR))) {
    return formatPath(path.join(rootDir, tempDir, 'pages', pageName, LAYOUT_DIR));
  }
  const pagePath = path.join(rootDir, tempDir, 'pages', pageName, 'index.tsx');
  return formatPath(pagePath);
}

function addLastSlash(filePath: string) {
  return filePath.endsWith('/') ? filePath : `${filePath}/`;
}
