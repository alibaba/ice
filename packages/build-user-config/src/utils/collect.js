const { collectDetail } = require('@alifd/fusion-collector');

const collect = ({ command, rootDir, pkg, log }) => {
  if (Object.keys(pkg).length === 0) {
    // package.json is not exsist or package.json is empty
    return;
  }
  if (!process.env.DISABLE_COLLECT) {
    let kitVersion = '0.1.x'; // set default version;
    ['devDependencies', 'dependencies'].forEach((pkgKey) => {
      kitVersion = (pkg[pkgKey] && pkg[pkgKey]['@alib/build-scripts']) || kitVersion;
    });
    try {
      const options = {
        rootDir,
        kit: 'build-scripts',
        kitVersion,
        cmdType: process.stderr.isTTY ? command : `nontty-${command}`,
      };
      collectDetail(options);
    } catch (err) {
      log.warn('[collect error]', err);
    }
  }
};

module.exports = collect;
