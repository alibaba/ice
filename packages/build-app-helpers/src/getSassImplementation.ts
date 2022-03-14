function resolvePkgPath(pkg, resolvePath?: string): string {
  return resolvePath ? require.resolve(pkg, { paths: [resolvePath] }) : require.resolve(pkg);
}

function getDefaultSassImplementation(defaultSassImplPkg: string, resolvePath?: string) {
  let sassImplPkg = defaultSassImplPkg;
  const fallbackSassImplPkg = defaultSassImplPkg === 'sass' ? 'node-sass' : 'sass';
  try {
    sassImplPkg = resolvePkgPath(defaultSassImplPkg, resolvePath);
  } catch (error) {
    try {
      sassImplPkg = resolvePkgPath(fallbackSassImplPkg, resolvePath);
    } catch (ignoreError) {
      sassImplPkg = 'sass';
    }
  }
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(sassImplPkg);
}

function getSassImplementation(defaultSassImplPkg = 'sass', resolvePath?: string) {
  try {
    return getDefaultSassImplementation(defaultSassImplPkg, resolvePath);
  } catch (error) {
    console.error('Run `npm install sass` or `yarn add sass` inside your workspace.');
    // exit process when sass require is failed
    process.exit(1);
  }
  return null;
}

export default getSassImplementation;