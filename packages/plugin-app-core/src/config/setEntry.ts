export default (api, options) => {
  const { modifyUserConfig, context } = api;
  const { userConfig } = context;

  if (options.framework === 'react') {
    if (!userConfig.entry) {
      modifyUserConfig('entry', 'src/app');
    }
  }
};
