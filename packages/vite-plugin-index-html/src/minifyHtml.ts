import * as minifier from 'html-minifier-terser';

const minifyHtml = async (html: string, minify: boolean | object) => {
  if (typeof minify === 'boolean' && !minify) {
    return html;
  }

  let terserOptions: boolean | object = minify;

  if (typeof minify === 'boolean' && minify) {
    terserOptions = {
      // https://www.npmjs.com/package/html-minifier-terser#options-quick-reference
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    };
  }

  try {
    return await minifier.minify(html, terserOptions);
  } catch (e) {
    const isParseError = String(e.message).indexOf('Parse Error') === 0;
    if (isParseError) {
      e.message = `${'vite-plugin-index-html could not minify the generated output.\n' +
          'In production mode the html minifcation is enabled by default.\n' +
          'If you are not generating a valid html output please disable it manually.\n' +
          'You can do so by adding the following setting to your HtmlWebpackPlugin config:\n|\n|' +
          '    minify: false\n|\n' +
          'For parser dedicated bugs please create an issue here:\n' +
          'https://danielruf.github.io/html-minifier-terser/' +
        '\n'}${  e.message}`;
    }
    throw e;
  }
};

export default minifyHtml;
