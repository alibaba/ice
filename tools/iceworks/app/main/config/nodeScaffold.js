const koa = {
  tarball: {
    name: 'ice-koa-react-scaffold',
    title: 'ICE Koa Template',
    source:
      {
        type: 'npm',
        npm: 'ice-koa-react-scaffold',
        registry: 'http://registry.npmjs.com'
      }
  },
  PendingFields: {
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
      'dependencies',
      'devDependencies'
    ]
  }
};

const midway = {
  tarball: {
    name: 'ice-midway-react-scaffold',
    title: 'ICE Midway Template',
    source:
      {
        type: 'npm',
        npm: 'ice-midway-react-scaffold',
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
      'dependencies',
      'devDependencies'
    ]
  }
};

module.exports = {
  koa,
  midway
};
