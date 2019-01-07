const cleancss = require('gulp-clean-css');
const co = require('co');
const es = require('event-stream');
const execa = require('execa');
const filter = require('gulp-filter');
const gulp = require('gulp');
const gutil = require('gulp-util');
const inquirer = require('inquirer');
const oss = require('ali-oss');
const path = require('path');
const pathExists = require('path-exists');
const replace = require('gulp-replace');
const shelljs = require('shelljs');
const spawn = require('cross-spawn');
const UglifyJS = require('uglify-es');
const writeFile = require('write');

const colors = gutil.colors;
const isMac = process.platform === 'darwin';
// eslint-disable-next-line
const isWin32_x64 = process.platform === 'win32' && process.arch === 'x64';
// eslint-disable-next-line
const isLinux_x64 = process.platform === 'linux' && process.arch === 'x64';

const appPkg = require('./app/package.json');

const productName = appPkg.productName;

const SOURCES = {
  main: 'app/main',
  renderer: './renderer',
};

const OUTPUTS = {
  main: 'out/main',
  renderer: 'out/renderer',
};

/**
 * 压缩 js
 */
function esuglify() {
  return es.map((chunk, callback) => {
    const code = String(chunk.contents);
    const result = UglifyJS.minify(code, {
      warnings: 'verbose',
      mangle: {
        toplevel: true,
      },
      output: {
        ascii_only: true,
      },
      compress: {
        unused: true,
      },
    });
    if (result.error) {
      console.error(chunk.path);
      callback(
        new gutil.PluginError({
          plugin: chunk.path,
          message: result.error.stack,
        })
      );
    } else {
      callback(
        null,
        new gutil.File({
          path: chunk.path,
          base: chunk.base,
          cwd: chunk.cwd,
          contents: Buffer.from(result.code),
        })
      );
    }
  });
}
/**
 * copy 文件
 */
function copyMainFiles() {
  return es.map((chunk, callback) => {
    callback(
      null,
      new gutil.File({
        path: chunk.path,
        base: chunk.base,
        cwd: chunk.cwd,
        contents: chunk.contents,
      })
    );
  });
}
/**
 * 上传文件到 oss
 * @param {*} paths oss 目标路径
 * @param {*} file 本地文件路径
 */
async function getUpload2oss() {
  gutil.log('Access Key 请在 oss 平台查询');
  const accessKey = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: '请输入 Access KeyId',
      default: 'LTAIpfdX8L8sa98T',
    },
    {
      type: 'input',
      name: 'secret',
      message: '请输入 Access Key Secret (默认值读取: process.env.SECRET)',
      default: process.env.SECRET || '',
    },
    {
      name: 'bucket',
      type: 'list',
      choices: ['iceworks', 'iceworks-beta', 'iceworks-next'],
      message: '请选择 bucket',
    },
  ]);

  const iceworksStore = oss({
    bucket: accessKey.bucket,
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId: accessKey.id,
    accessKeySecret: accessKey.secret,
    time: '120s',
  });

  return async function(paths, file) {
    if (!pathExists.sync(file)) {
      gutil.log(colors.red('不存在文件'), file);
      return 1;
    }
    gutil.log(
      colors.yellow('开始上传'),
      path.relative(__dirname, file),
      '=>',
      paths.join('/')
    );
  
    return co(iceworksStore.put(paths.join('/'), file))
      .then((object = {}) => {
        if (object.res && object.res.status == 200) {
          gutil.log(colors.green('上传成功'), object.url);
          return 0;
        } else {
          gutil.log(colors.red('上传失败'), file);
          return 1;
        }
      })
      .catch(() => {
        gutil.log(colors.red('上传失败'), file);
        return 1;
      });
  }
}

gulp.task('compile:after:css', ['compile:prod'], () => {
  return gulp
    .src(`${OUTPUTS.renderer}/*.css`)
    .pipe(replace(/\/\/([a-z]*)\.alicdn.com/g, 'https://$1.alicdn.com'))
    .pipe(cleancss())
    .pipe(gulp.dest(OUTPUTS.renderer));
});

const mainInput = `./${SOURCES.main}/**/*.*`;
// 构建 main 文件
gulp.task('babel:main', ['clean'], () => {
  const js = filter('**/*.js', { restore: true });
  return gulp
    .src(mainInput)
    .pipe(js)
    .pipe(esuglify())
    .pipe(js.restore)
    .pipe(copyMainFiles())
    .pipe(gulp.dest(OUTPUTS.main));
});

// 清空
gulp.task('clean', () => {
  gutil.log('移除 ./dist/ ./out/ 文件夹');
  shelljs.rm('-rf', ['dist', 'out']);
});

// webpack 编译
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

gulp.task('compile:dev', (done) => {
  process.env.NODE_ENV = 'development';

  const config = require('./webpack.development.js');
  const compiler = webpack(config);

  compiler.apply(new webpack.ProgressPlugin());

  const devServer = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'renderer/src'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 7001,
    stats: {
      colors: true,
      assetsSort: 'size',
      warnings: false,
      chunks: false,
      entrypoints: false,
      modules: false,
    },
  });

  // Launch WebpackDevServer.
  devServer.listen(7001, '0.0.0.0', (err) => {
    if (err) {
      gutil.log(err);
    } else {
      gutil.log(`\n      webpack dev server at: http://localhost:${7001} \n`);
    }
    done(err);
  });
});

gulp.task('compile:prod', ['clean'], (done) => {
  process.env.NODE_ENV = 'production';
  const config = require('./webpack.production.js');
  const compiler = webpack(config);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run((err, stats) => {
    // eslint-disable-next-line
    console.log(
      stats.toString({
        assetsSort: 'size',
        warnings: false,
        colors: true,
        chunks: false,
        entrypoints: false,
        modules: false,
      })
    );
    done(err);
  });
});

// build
const builder = require.resolve('electron-builder/out/cli/cli.js');
gulp.task('dist:mac', (done) => {
  const ls = spawn(
    builder,
    ['--config', '.buildrc', '--mac', '--publish', 'always'],
    {
      stdio: 'inherit',
    }
  );
  ls.on('close', (code) => {
    if (code == 0) {
      gutil.log(colors.green('dmg 打包完成'));
    } else {
      gutil.log(colors.red('dmg 打包失败'));
    }
    done(code);
  });
});

gulp.task('electron-rebuild', (done) => {
  const ls = spawn('yarn', ['rebuild-node-pty:out'], {
    stdio: 'inherit',
  });
  ls.on('close', (code) => {
    if (code == 0) {
      gutil.log(colors.green('rebuild 打包完成'));
    } else {
      gutil.log(colors.red('rebuild 打包失败'));
    }
    done(code);
  });
});

gulp.task('dist:win', (done) => {
  const ls = spawn(
    builder,
    ['--config', '.buildrc', '--win', '--publish', 'always'],
    {
      stdio: 'inherit',
    }
  );
  ls.on('close', (code) => {
    if (code == 0) {
      gutil.log(colors.green('exe 打包完成'));
    } else {
      gutil.log(colors.red('exe 打包失败'));
    }
    done(code);
  });
});

// 生成 updates.js 文件，提供给站点下载
gulp.task('publish', (done) => {
  const now = gutil.date(new Date(), 'yyyy-mm-dd');
  const version = appPkg.version;

  const template = {
    'darwin-x64-prod': {
      name: 'iceworks',
      description: 'ICE Desktop Application.',
      install: `http://iceworks.oss-cn-hangzhou.aliyuncs.com/mac/${productName}-${version}.dmg`,
      version: appPkg.version,
      releaseDate: now,
    },
    'win-x64-prod': {
      name: 'iceworks',
      description: 'ICE Desktop Application.',
      install: encodeURI(
        `http://iceworks.oss-cn-hangzhou.aliyuncs.com/win/${productName}-setup-${version}.exe`
      ),
      version: appPkg.version,
      releaseDate: now,
    },
  };

  writeFile(
    './dist/updates.js',
    `callback(${JSON.stringify(template, null, 2)})`
  )
    .then(() => {
      return writeFile(
        './dist/updates.json',
        JSON.stringify(template, null, 2)
      );
    })
    .then(() => {
      done();
    });
});

// 以下环境变量可忽略
// 仅为飞冰团队发布所需

process.env.DEF_CLIENT = process.env.DEF_CLIENT || 'unsupport-def';
process.env.DEF_CLIENT_VERSION = process.env.DEF_CLIENT_VERSION || '0.0.0';

const DEF_CLIENT_PACKAGE = `${process.env.DEF_CLIENT}@${
  process.env.DEF_CLIENT_VERSION
}`;
const ALI_NPM_REGISTRY = process.env.ALI_NPM_REGISTRY;

// 调试环境仅安装依赖，不生成 dependencies
gulp.task('def-install:dev', (done) => {
  if (ALI_NPM_REGISTRY) {
    execa(
      'yarn',
      [
        'add',
        DEF_CLIENT_PACKAGE,
        '--optional',
        '--no-lockfile',
        '--registry',
        ALI_NPM_REGISTRY,
      ].filter(Boolean),
      {
        cwd: path.join(__dirname, 'app'),
      }
    )
      .then(() => {
        gutil.log(DEF_CLIENT_PACKAGE, '安装完成');
        const appPackageJson = require('./app/package.json');
        delete appPackageJson.optionalDependencies;
        writeFile(
          path.join(__dirname, './app/package.json'),
          JSON.stringify(appPackageJson, null, 2)
        ).then(() => {
          done();
        });
      })
      .catch(() => {
        gutil.log(DEF_CLIENT_PACKAGE, '安装失败');
        done();
      });
  } else {
    gutil.log('已跳过 DEF 环境');
    done();
  }
});

gulp.task('dev', ['def-install:dev'], () => {
  gulp.start(['compile:dev']);
});

// 打包构建时，需要声明 depenencies
// electron 构建时会以 depenencies 作为过滤项
gulp.task('def-install:pro', ['copy-app-assets'], (done) => {
  if (ALI_NPM_REGISTRY) {
    execa('yarn', ['add', DEF_CLIENT_PACKAGE, '--registry', ALI_NPM_REGISTRY], {
      cwd: path.join(__dirname, 'out'),
    })
      .then(() => {
        gutil.log(DEF_CLIENT_PACKAGE, '安装完成');
        done();
      })
      .catch(() => {
        done();
      });
  } else {
    done();
  }
});

// 拷贝打包所需的项目依赖声明，静态文件等
gulp.task('copy-app-assets', (done) => {
  gutil.log(colors.green('拷贝 yanr.lock package.json 到 out/'));
  shelljs.cp('./app/yarn.lock', './out/yarn.lock');
  shelljs.cp('./app/package.json', './out/package.json');
  gutil.log(colors.green('拷贝 static 静态文件'));
  shelljs.cp('-R', './app/static', './out/static/');
  gutil.log(colors.green('在 out/ 安装应用所需依赖'));
  execa('yarn', ['install'], {
    cwd: path.join(process.cwd(), 'out'),
    stdio: 'inherit',
  })
    .then(() => {
      gutil.log(colors.green('out 依赖安装完成'));
      shelljs.cp('-R', './out/node_modules/.bin', './out/node_modules/_bin');
      done();
    })
    .catch((err) => {
      gutil.log(colors.red('out 依赖安装失败'));
      done(err);
    });
});

// 生成应用所需要文件
gulp.task('build', ['babel:main', 'compile:after:css'], () => {
  gulp.start(['def-install:pro']);
});

gulp.task('dist', () => {
  if (isMac) {
    gutil.log(colors.green('darwin 打包'));
    gulp.start(['dist:mac']);
  } else if (isWin32_x64) {
    gutil.log(colors.green(' win32 打包'));
    gulp.start(['dist:win']);
  }
});

gulp.task('oss', async function() {
  const upload2oss = await getUpload2oss();

  const version = require('./out/package.json').version;
  const distDir = path.join(__dirname, 'dist');

  let channel = 'latest';

  const versionPatch = version.split('.')[2];
  if (versionPatch.indexOf('-') !== -1) {
    channel = versionPatch.split('-')[1];
  }

  gutil.log('channel', channel);

  if (isMac) {
    const macDist = [
      `${productName}-${version}.dmg`,
      `${productName}-${version}-mac.zip`,
      `${channel}-mac.json`,
      `${channel}-mac.yml`,
    ];

    for (const name of macDist) {
      const filepath = path.join(distDir, name);
      const code = await upload2oss(['mac', name], filepath);
      if (code !== 0) {
        break;
      }
    }
  } else if (isWin32_x64) {
    const winDist = [`${productName}-setup-${version}.exe`, `${channel}.yml`];

    for (const name of winDist) {
      const filepath = path.join(distDir, name);
      const code = await upload2oss(['win', name], filepath);
      if (code !== 0) {
        break;
      }
    }
  } else if (isLinux_x64) {
    const linuxDist = [
      `${productName}-amd64-${version}.deb`,
      `${productName}-x86_64-${version}.AppImage`,
      `${channel}-linux.yml`,
    ];

    for (const name of linuxDist) {
      const filepath = path.join(distDir, name);
      const code = await upload2oss(['linux', name], filepath);
      if (code !== 0) {
        break;
      }
    }
  }
});

/**
 * 日志文件上传到 oss。
 * dist/updates.json => oss: `${bucket}/`
 * changelog/changelog.json => oss: `${bucket}/`
 * changelog/${verison}.json => oss: `${bucket}/changelog/`
 * dist/updates.json ==copy=> iceworks-updates.json => oss: `${bucket}/assets/`
 * changelog/changelog.json ==copy=> iceworks-changelog.json => oss: `${bucket}/assets/`
 */
gulp.task('oss-log', async () => {
  const upload2oss = await getUpload2oss();
  const version = require('./out/package.json').version;
  const productNameLowCase = productName.toLowerCase();
  const filepaths = [{
    from: 'dist/updates.json', // iceworks 下的相对路径
    to: ['updates.json'] // oss 对应 bucket 下的相对路径
  }, {
    from: 'changelog/changelog.json',
    to: ['changelog.json']
  }, {
    from: `changelog/${version}.json`,
    to: [`changelog/${version}.json`]
  }, {
    from: 'dist/updates.json',
    to: ['assets', `${productNameLowCase}-updates.json`]
  }, {
    from: 'changelog/changelog.json',
    to: ['assets', `${productNameLowCase}-changelog.json`]
  }];
  // 上传
  filepaths.forEach( async filepath => {
    const fromDir = path.join(__dirname, filepath.from);
    const code = await upload2oss(filepath.to, fromDir);
    if (code !== 0) {
      gutil.log( colors.red(`${fromDir} => ${filepath.to.join('/')} error`) );
    }
  });

})

gulp.task('build-dist', ['build'], () => {
  gulp.start(['dist']);
});
