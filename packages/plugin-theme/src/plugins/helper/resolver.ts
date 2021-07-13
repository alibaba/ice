import * as resolve from 'resolve';

const moduleDirectories = ['web_modules', 'node_modules'];

function resolveModule(id: string, opts: any) {
  return new Promise((res, rej) => {
    resolve(id, opts, (err, path) => (err ? rej(err) : res(path)));
  });
}

/**
 * postcss-import 的 resolve 函数
 * 
 * 由于 postcss-import 不透出 extensions, 故再此实现 resolve
 */
export const resolver = async (id: string, base: string, options: any) => {
  const paths = options.path;

  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
    paths,
    extensions: ['.css', '.scss', '.less'],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) pkg.main = pkg.style;
      else if (!pkg.main || !/\.css$/.test(pkg.main)) pkg.main = 'index.css';
      return pkg;
    },
    preserveSymlinks: false,
  };

  return resolveModule(`./${id}`, resolveOpts)
    .catch(() => resolveModule(id, resolveOpts))
    .catch(() => {
      if (paths.indexOf(base) === -1) paths.unshift(base);

      throw new Error(
        `Failed to find '${id}'
  in [
    ${paths.join(',\n        ')}
  ]`
      );
    });
};
