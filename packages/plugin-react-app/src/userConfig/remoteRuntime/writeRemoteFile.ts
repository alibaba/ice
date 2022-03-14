import * as path from 'path';
import * as fse from 'fs-extra';
import * as findUp from 'find-up';
import { init, parse } from 'es-module-lexer';

async function writeRemoteFile(compilePackages: string[], rootDir: string) {
  const analyzeTasks = [];
  const exposesTemp = './.ice/remoteExposes';
  compilePackages.forEach((packageName) => {
    analyzeTasks.push(getExposeContent(packageName, rootDir));
  });
  const runtimeContents = await Promise.all(analyzeTasks);
  fse.ensureDirSync(path.join(rootDir, exposesTemp));
  return runtimeContents.reduce((prev ,{ packageName, exposeContent }) => {
    if (exposeContent) {
      const exposePath = path.join(exposesTemp, packageName);
      const tempDir = path.join(rootDir, exposePath);
      fse.ensureDirSync(tempDir);
      fse.writeFileSync(path.join(tempDir, 'index.js'), exposeContent);
      prev.push({ packageName, exposePath });
    }
    return prev;
  }, []);
}

async function getExposeContent(packageName: string, rootDir: string) {
  let entryPath = '';
  let exposeContent = '';
  let packageJson = '';
  try {
    packageJson = await findUp('package.json', { cwd: require.resolve(packageName) });
  } catch(err) {
    // ignore error
  }
  try {
    if (packageJson) {
      const { module, main } = fse.readJSONSync(packageJson);
      entryPath = path.join(path.dirname(packageJson), module || main || 'index.js');
    } else {
      // path link @alifd/next/es/button
      entryPath = require.resolve(path.join(rootDir, 'node_modules', packageName));
    }

    if (fse.existsSync(entryPath)) {
      const source = fse.readFileSync(entryPath, 'utf-8');
      await init;
      const [imports, exports] = parse(source);
      if (!imports.length && !exports.length) {
        // cjs
        exposeContent = `import _ from '${packageName}';\nexport default _;\nexport * from '${packageName}';`;
        return {
          packageName,
          exposeContent,
        };
      }

      if (exports.length) {
        exposeContent = `${exports.includes('default') ? `import _ from '${packageName}';\nexport default _;` : ''}\nexport * from '${packageName}';`;
      } else {
        // side effect
        exposeContent = `import '${packageName}';export {}`;
      }
      return {
        packageName,
        exposeContent,
      };

    }
  } catch(err) {
    // ignore err
    console.log(`error occur when parse expose content of ${packageName}`);
  }

  return {
    packageName,
    exposeContent,
  };
}

export default writeRemoteFile;