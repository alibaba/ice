const configData = {
  '/home': {
    priority: 'low',
    dataPrefetch: {
      api: 'test/api',
    },
  },
  '/about': {
    defaultFrameIndex: 0,
    queryParams: 'c=123',
  },
  '/app/nest': {
    frames: [
      'home',
      {
        url: 'https://m.taobao.com',
      },
    ],
  },
}

const config = new Proxy(configData, {
  get: function(obj, props) {
    if (props in obj) {
      const defaultConfig = {
        title: `title-${props.replace(/^\//, '')}`,
      };
      return () => ({
        ...defaultConfig,
        ...(obj[props] || {}),
      });
    } else {
      return undefined;
    }
  }
})

export default config;