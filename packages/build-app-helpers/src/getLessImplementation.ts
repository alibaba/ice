function resolvePkgPath(pkg, resolvePath?: string): string {
  return resolvePath ? require.resolve(pkg, { paths: [resolvePath] }) : require.resolve(pkg);
}

function getDefaultLessImplementation(resolvePath?: string) {
  let lessImplPkg;
  try {
    lessImplPkg = resolvePkgPath(lessImplPkg, resolvePath);
  } catch (error) {
    lessImplPkg = 'less';
  }
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(lessImplPkg);
}

function getLessImplementation(resolvePath?: string) {
  try {
    return getDefaultLessImplementation(resolvePath);
  } catch (error) {
    console.error('Run `npm install less` or `yarn add less` inside your workspace.');
    // exit process when less require is failed
    process.exit(1);
  }
}

export default getLessImplementation;
