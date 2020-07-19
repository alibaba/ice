export default (api) => {
  const { modifyUserConfig, context } = api;
  const { userConfig } = context;

  if (!userConfig.entry) {
    modifyUserConfig('entry', 'src/app');
  }
};
