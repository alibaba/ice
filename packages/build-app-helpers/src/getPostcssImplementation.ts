function resolvePkgPath(pkg, resolvePath?: string): string {
  return resolvePath ? require.resolve(pkg, { paths: [resolvePath] }) : require.resolve(pkg);
}

function getDefaultPostcssImplementation(resolvePath?: string) {
  let postcssImplPkg = 'postcss';
  try {
    postcssImplPkg = resolvePkgPath(postcssImplPkg, resolvePath);
    // eslint-disable-next-line no-empty
  } catch (error) {
  }
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(postcssImplPkg);
}

function getPostcssImplementation(resolvePath?: string) {
  try {
    return getDefaultPostcssImplementation(resolvePath);
  } catch (error) {
    console.error('Run `npm install postcss` or `yarn add postcss` inside your workspace.');
    // exit process when postcss require is failed
    process.exit(1);
  }
}

export default getPostcssImplementation;
