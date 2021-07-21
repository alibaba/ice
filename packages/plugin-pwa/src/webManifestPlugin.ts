import * as HtmlWebpackPlugin from 'html-webpack-plugin';

export default class WebManifestPlugin {
  public options: any;

  constructor (options) {
    this.options = options;
  }

  public apply(compiler) {
    const pluginName = this.constructor.name;
    compiler.hooks.compilation.tap('HtmlWebpackPlugin', (compilation) => {
      // console.log('fsdfsfsf', HtmlWebpackPlugin.getHooks(compilation).alterAssetTags);
      // console.log('fsfdsfsf', pluginName);
      console.log('fsfdfs', Object.keys(compilation.hooks));
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('tes', (data, cb) => {
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbb-----', data);
        data.html += 'The Magic Footer';
        // return data;
        cb(null, data);
      });
      // compilation.hooks.beforeChunks.tap('fsfdsf', (data) => {
      //   console.log('fsfs', data);
      // });
    });
  }
  // public apply (compiler) {
  //   // compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
  //   //   console.log('The compiler is starting a new compilation...');

  //   //   // Static Plugin interface |compilation |HOOK NAME | register listener 
  //   //   HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
  //   //     'MyPlugin', // <-- Set a meaningful name here for stacktraces
  //   //     (data, cb) => {
  //   //       // Manipulate the content
  //   //       console.log('fsfd');
  //   //       data.html += 'The Magic Footer';
  //   //       // Tell webpack to move on
  //   //       cb(null, data);
  //   //     }
  //   //   );
  //   // });
  //   // compiler.hooks.afterEmit.tap('fsdfsf', (compilation) => {
  //   //   console.log('fsdf', Object.keys(compilation.assets));
  //   // });
  // }
}