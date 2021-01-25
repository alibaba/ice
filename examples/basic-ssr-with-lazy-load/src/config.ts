const config = {
  dev: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}/api`
  },
  prod: {
    baseURL: 'http://example.com/api'
  }
};

export default config;
