const koa2 = {
  tarball: {
    name: 'ice-koa-template',
    title: 'ICE Koa Template',
    source:
      {
        type: 'npm',
        npm: '@icedesign/ice-koa-template',
        version: '1.0.0-beta.6',
        registry: 'http://registry.npmjs.com'
      }
  },
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
};

const midway = {
  tarball: {
    name: 'ice-midway-template',
    title: 'ICE Midway Template',
    source:
      {
        type: 'npm',
        npm: '@icedesign/ice-midway-template',
        version: '1.0.0-beta.4',
        registry: 'http://registry.npmjs.com'
      }
  },
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
};

module.exports = {
  koa2,
  midway
};
