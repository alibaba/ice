/* eslint no-unused-expressions: 0 */
const Metalsmith = require('metalsmith');
const uppercamelcase = require('uppercamelcase');
const async = require('async');
const ejsRender = require('consolidate').ejs.render;
const multimatch = require('multimatch');
const kebabCase = require('kebab-case');
const { getNpmRegistry } = require('ice-npm-utils');
const transform = require('./transform');
const debug = require('debug')('ice:templateRender');

const TEMPLATE_PATH = '.template';

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    render(options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} npmName
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */
function render(options, done) {
  const {
    src,
    dest,
    name,
    npmName,
    ...opts
  } = options;

  debug('%j', { name, src, dest });

  // const metalsmith = Metalsmith(path.join(src, 'template'));
  const metalsmith = Metalsmith(src);
  metalsmith.frontmatter(false);

  const data = Object.assign(metalsmith.metadata(), {
    name: kebabCase(name).replace(/^-/, ''),
    npmName: kebabCase(npmName || name).replace(/^-/, ''),
    className: uppercamelcase(name),
    inPlace: dest === process.cwd(),
    noEscape: true,
    registry: getNpmRegistry(npmName || name),
    categories: {},
    ...opts,
  });
  debug('%j', data);

  metalsmith
    .use(renderTemplateFiles())
    .use(transformFile(data.skipGitIgnore))
    .ignore([TEMPLATE_PATH, 'meta.js']);

  metalsmith
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err) => {
      // 需要显性控制从物料 meta.js 中提取出来的 message 展现时机
      done(err, () => {
        logMessage(data);
      });
    });

  return data;
}

function transformFile(skipGitIgnore) {
  return (files, metalsmith, done) => {
    transform(files, {
      ...metalsmith.metadata(),
      skipGitIgnore,
    }, done);
  };
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function renderTemplateFiles(skipInterpolation) {
  skipInterpolation =
    typeof skipInterpolation === 'string'
      ? [skipInterpolation]
      : skipInterpolation;

  return (files, metalsmith, done) => {
    const keys = Object.keys(files);
    const metalsmithMetadata = metalsmith.metadata();

    // HACK: need refactor
    Object.keys(metalsmithMetadata).forEach((key) => {
      if (key === 'type') {
        if (
          metalsmithMetadata[key].react &&
          metalsmithMetadata[key].vue
        ) {
          metalsmithMetadata.materialType = ['react', 'vue'];
        } else if (metalsmithMetadata[key].react) {
          metalsmithMetadata.materialType = 'react';
        } else if (metalsmithMetadata[key].vue) {
          metalsmithMetadata.materialType = 'vue';
        }
      }
    });

    async.each(
      keys,
      (file, next) => {
        // skipping files with skipInterpolation option
        if (
          skipInterpolation &&
          multimatch([file], skipInterpolation, { dot: true }).length
        ) {
          return next();
        }
        const str = files[file].contents.toString();

        ejsRender(str, metalsmithMetadata, (err, res) => {
          if (err) {
            err.message = `[${file}] ${err.message}`;
            return next(err);
          }
          /* eslint-disable-next-line no-buffer-constructor */
          files[file].contents = new Buffer(res);
          next();
        });
      },
      done
    );
  };
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */
function logMessage(message, data) {
  if (!message) return;
  ejsRender(message, data, (err, res) => {
    if (err) {
      console.error(
        `\n   Error when rendering template complete message: ${
          err.message.trim()}`
      );
    } else {
      console.log(
        `\n${
          res
            .split(/\r?\n/g)
            .map((line) => `   ${line}`)
            .join('\n')}`
      );
    }
  });
}
