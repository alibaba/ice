module.exports = (api, devServer) => {
  api.chainWepack((config) => {
    config.merge({ devServer });
  });
};
