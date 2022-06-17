const configData = {
  home: {
    priority: 'low',
  },
  about: {
    defaultFrameIndex: 0,
  },
  'app/nest': {
    frames: [
      '/home',
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
        title: `title-${props}`,
      };
      return {
        ...defaultConfig,
        ...(obj[props] || {}),
      };
    } else {
      return undefined;
    }
  }
})

export default config;