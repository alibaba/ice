// config runtime APP_MODE
// @ts-ignore

const config = {
  dev: {
    appId: 'dev-id',
    API_URL: `http://localhost:${process.env.SERVER_PORT}`,
  },
  build: {
    API_URL: 'http://github.com/api'
  },
  default: {
    'appId': 'default-id',
    'sercet': 'hahjhjhj'
  }
};

export default config;
