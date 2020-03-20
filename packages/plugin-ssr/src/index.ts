import * as path from 'path'
import * as fse from 'fs-extra'
import * as ejs from 'ejs'
import { minify } from 'html-minifier';
import { getWebpackConfig } from 'build-scripts-config'
import * as nodeExternals from 'webpack-node-externals'

const plugin = async (api): Promise<void> => {
  const { context, registerTask, getValue, onGetWebpackConfig, onHook } = api
  const { rootDir, command, webpack, userConfig } = context
  const ICE_TEMP = getValue('ICE_TEMP')
  const ssrEntry = path.join(ICE_TEMP, 'server.ts')
  // Note: Compatible plugins to modify configuration
  const buildDir = path.join(rootDir, userConfig.outputDir)
  const serverDir = path.join(buildDir, 'server')
  const serverFilename = 'index.js'

  const templatePath = path.join(__dirname, '../src/server.ts.ejs')
  const templateContent = fse.readFileSync(templatePath, 'utf-8')
  const content = ejs.render(templateContent)
  fse.ensureDirSync(path.dirname(ssrEntry))
  fse.writeFileSync(ssrEntry, content, 'utf-8')

  const mode = command === 'start' ? 'development' : 'production'
  const webpackConfig = getWebpackConfig(mode)
  registerTask('ssr', webpackConfig)
  onGetWebpackConfig('ssr', (config) => {
    config.entryPoints.clear()

    config.entry('server').add(ssrEntry)

    config.target('node')

    config
      .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [{
        'process.env.__IS_SERVER__': true
      }])
      .end()

    config.plugins.delete('MiniCssExtractPlugin');
    ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).uses.delete('MiniCssExtractPlugin.loader')
        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            onlyLocals: true
          }));
      }
    })

    config.output
      .path(serverDir)
      .filename(serverFilename)
      .publicPath('/')
      .libraryTarget('commonjs2')

    config.externals([
      nodeExternals()
    ])

    if (command === 'start') {
      config.devServer
        .hot(true)
        .writeToDisk((filePath) => {
          return /(server\/index\.js|index.html)$/.test(filePath)
        })

      config.devServer.set('before', (app) => {
        const pattern = /^\/?((?!\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf|ico)).)*$/;
        app.get(pattern, async (req, res) => {
          const htmlTemplate = fse.readFileSync(path.join(buildDir, 'index.html'), 'utf8')
          // eslint-disable-next-line
          const serverRender = require(path.join(serverDir, serverFilename))
          const html = await serverRender.default({ pathname: req.path, htmlTemplate })
          console.log(`\n${html}\n`)
          res.send(html)
        });
      });
    }

    if (command === 'build') {
      config.optimization.minimize(false)
      onHook('after.build.compile', () => {
        const serverFilePath = path.join(serverDir, serverFilename)
        const htmlFilePath = path.join(buildDir, 'index.html')
        const bundle = fse.readFileSync(serverFilePath, 'utf-8')
        const html = fse.readFileSync(htmlFilePath, 'utf-8')
        const minifedHtml = minify(html, { collapseWhitespace: true, })
        const newBundle = bundle.replace(/__ICE_SERVER_HTML_TEMPLATE__/, minifedHtml)
        fse.writeFileSync(serverFilePath, newBundle, 'utf-8')
      });
    }
  });
};

export default plugin;
