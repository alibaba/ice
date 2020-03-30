import config from '@/config';

interface Config {
  readonly [propName: string]: any;
}

const userConfig: Config = {
  ...(config.default || {}),
  ...(config[(window && window.__app_mode__) || process.env.APP_MODE] || {}),
};

export default userConfig;
