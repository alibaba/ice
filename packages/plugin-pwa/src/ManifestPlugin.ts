import * as HtmlWebpackPlugin from 'html-webpack-plugin';

function ensureTrailingSlash(str: string) {
  if (str.length && str.substr(-1, 1) !== '/') {
    return `${str}/`;
  }

  return str;
}

class ManifestPlugin {
  public apply (compiler) {

    compiler.hooks.compilation.tap('ManifestPlugin', compilation => {
      let alterAssetTagsHook;

      if ((HtmlWebpackPlugin as any).version >= 4) {
        const hooks = (HtmlWebpackPlugin as any).getHooks(compilation);
        alterAssetTagsHook = hooks.alterAssetTags;

      } else {
        const { hooks } = compilation;
        alterAssetTagsHook = hooks.htmlWebpackPluginAlterAssetTags;
      }

      alterAssetTagsHook.tap('ManifestPlugin', function (htmlPluginData) {
        const publicPath = compilation?.outputOptions?.publicPath ? compilation.outputOptions.publicPath : '/';
        // append publicPath to htm
        if (htmlPluginData.assetTags) {
          htmlPluginData.assetTags.meta.push({
            tagName: 'link',
            voidTag: true,
            attributes: { rel: 'manifest', href: `${ensureTrailingSlash(publicPath)}manifest.json` }
          });
        }
      });

    });

  }

}

export default ManifestPlugin;