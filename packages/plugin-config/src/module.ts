import config from '$ice/config'

const module = ({ appConfig }) => {
  if (appConfig.config) {
    const userConfig = {
      ...appConfig.config.default,
      ...appConfig.config[process.env.APP_MODE]
    };
    Object.keys(userConfig).forEach(key => {
      config[key] = userConfig[key]
    })
  }
}

export default module
