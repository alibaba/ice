const commonConfig = {
  pendingFields: {
    dotFiles: [
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.gitkeep'
    ],
    extractDirs: [
      'src',
      'public'
    ],
    pkgAttrs: [
      'scripts',
      'dependencies',
      'devDependencies'
    ]
  }
}

const koa2 = Object.assign({
  tarball: {
    name: 'ice-koa-template',
    title: 'ICE Koa Template',
    source:
      {
        type: 'npm',
        npm: '@icedesign/ice-koa-template',
        version: 'latest',
        registry: 'http://registry.npmjs.com'
      }
  }
}, commonConfig);

const midway = Object.assign({
  tarball: {
    name: 'ice-midway-template',
    title: 'ICE Midway Template',
    source:
      {
        type: 'npm',
        npm: '@icedesign/ice-midway-template',
        version: 'latest',
        registry: 'http://registry.npmjs.com'
      }
  }
}, commonConfig);

const midwayAli = Object.assign({
  tarball: {
    name: 'ice-ali-midway-template',
    title: 'ICE ALI Midway Template',
    source:
      {
        type: 'npm',
        npm: '@ali/ice-midway-template',
        version: 'latest',
        registry: 'http://registry.npm.alibaba-inc.com/'
      }
  }
}, commonConfig);

module.exports = {
  koa2,
  midway,
  midwayAli
};
