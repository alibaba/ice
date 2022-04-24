import * as path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import ncc from '@vercel/ncc';
import chalk from 'chalk';
import * as dts from 'dts-bundle';
import glob from 'glob';
import findUp from 'find-up';
import tasks, { taskExternals } from '../packages/bundles/tasks';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  pkgName?: string;
  rootDir?: string;
  target?: string;
  file?: string;
  externals?: Record<string, string>;
  minify?: boolean;
  declaration?: boolean;
  bundleName?: string;
  emptyDir?: boolean;
  matchCopyFiles?: (data: {
    resolvePath: string;
    resolveId: string;
  }) => boolean;
  patch?: () => void;
}

export async function packDependency(options: Options): Promise<void> {
  const {
    pkgName, file, rootDir, target, externals, matchCopyFiles, patch, emptyDir = true,
    bundleName = 'index.js', minify = true, declaration = true } = options;
  console.log(chalk.green(`start pack ${pkgName || file}`));

  const targetPath = path.join(rootDir, target);
  if (emptyDir) {
    fs.removeSync(targetPath);
  }
  const filesToCopy = [];
  const packEntry = file ? path.join(rootDir, file) : require.resolve(pkgName, {
    paths: [rootDir],
  });

  fs.ensureDirSync(targetPath);
  let { code, assets } = await ncc(packEntry, {
    externals,
    minify,
    target: 'es5',
    assetsBuilds: false,
    customEmit(filePath: string, opts: {id: string}) {
      const { id } = opts;
      if (matchCopyFiles && matchCopyFiles({
        resolvePath: filePath,
        resolveId: id,
      })) {
        filesToCopy.push(require.resolve(filePath, {
          paths: [path.dirname(id)],
        }));
        return `'./${path.basename(filePath)}'`;
      }
    },
  });
  for (const assetKey of Object.keys(assets)) {
    const asset = assets[assetKey];
    const data = asset.source;
    const fileTarget = path.join(targetPath, assetKey);
    fs.ensureDirSync(path.dirname(fileTarget));
    fs.writeFileSync(fileTarget, data);
  }
  // copy files
  for (const fileToCopy of filesToCopy) {
    let content = fs.readFileSync(fileToCopy, 'utf-8');
    for (const key of Object.keys(externals)) {
      content = content.replace(
        new RegExp(`require\\(['"]${key}['"]\\)`, 'gm'),
        `require('${externals[key]}')`,
      );
      content = content.replace(
        new RegExp(`require\\(['"]${key}/package(.json)?['"]\\)`, 'gm'),
        `require('${externals[key]}/package.json')`,
      );
    }
    fs.writeFileSync(
      path.join(targetPath, path.basename(fileToCopy)),
      content,
      'utf-8',
    );
  }
  // write code to package
  const outfile = path.join(targetPath, bundleName);
  fs.ensureDirSync(path.dirname(outfile));
  fs.writeFileSync(path.join(targetPath, bundleName), code, 'utf-8');
  if (pkgName) {
    const packageRoot = path.dirname(
      findUp.sync('package.json', {
        cwd: require.resolve(pkgName, { paths: [rootDir] }),
      }));
    // create license file
    const licensePath = path.join(packageRoot, 'LICENSE');
    if (fs.existsSync(licensePath)) {
      console.log(chalk.green(`create LICENSE for ${pkgName || file}`));
      fs.copyFileSync(licensePath, path.join(targetPath, 'LICENSE'));
    }
    // create package.json
    const pkgJson = fs.readJSONSync(path.join(packageRoot, 'package.json'));
    let dtsName = '';
    if (declaration) {
      if (pkgJson.types) {
        dtsName = 'index.d.ts';
        console.log(chalk.green(`bundle dts file for ${pkgName || file}`));
        dts.bundle({
          name: pkgJson.name,
          outputAsModuleFolder: true,
          out: path.join(targetPath, dtsName),
          main: path.join(packageRoot, pkgJson.types),
          headerPath: '',
          headerText: '',
        });
      } else {
        try {
          const typesRoot = path.dirname(require.resolve(`@types/${pkgName}/package.json`, {
            paths: [rootDir],
          }));
          const typeJson = fs.readJSONSync(path.join(typesRoot, 'package.json'));
          dtsName = typeJson.types.endsWith('.d.ts') ? typeJson.types : `${typeJson.types}.d.ts`;
          // copy dts to package root
          const files = glob.sync('**/*.d.ts', { cwd: typesRoot, nodir: true });
          console.log(chalk.green(`copy dts file for ${pkgName || file}`));
          for (const file of files) {
            const from = path.join(typesRoot, file);
            const to = path.join(targetPath, file);
            await fs.mkdirp(path.dirname(to));
            await fs.copyFile(from, to);
          }
        } catch (err) {
          console.log(chalk.yellow(`can not find dts file of ${pkgName}`));
        }
      }
    }
    console.log(chalk.green(`create package.json for ${pkgName || file}`));
    fs.writeJSONSync(path.join(targetPath, 'package.json'), {
      name: pkgJson.name,
      main: 'index.js',
      ...(dtsName ? { types: dtsName } : {}),
      ...(pkgJson.author ? { author: pkgJson.author } : {}),
      ...(pkgJson.license ? { license: pkgJson.license } : {}),
    });
  }

  if (patch) {
    patch();
  }
}

(async () => {
  for (let task of tasks) {
    await packDependency({
      rootDir: path.join(__dirname, '../packages/bundles'),
      externals: taskExternals,
      target: `compiled/${task.pkgName}`,
      ...task,
    });
  }
})();
