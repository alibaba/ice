module.exports = (config, ignoreHtmlTemplate, context) => {
  const { command, userConfig } = context;
  if (command === 'build' && ignoreHtmlTemplate) {
    const { entry } = userConfig;
    if (Object.prototype.toString.call(entry) === '[object Object]' && Object.keys(entry).length > 1)  {
      // delete multi HtmlWebpackPlugin
      Object.keys(entry).forEach((entryKey) => {
        config.plugins.delete(`HtmlWebpackPlugin_${entryKey}`);
      });
    } else {
      config.plugins.delete('HtmlWebpackPlugin');
    }
  }
};
