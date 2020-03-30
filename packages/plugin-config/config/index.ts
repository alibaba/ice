import config from '@/config';

interface Config {
  readonly [propName: string]: any;
}

const userConfig: Config = {
  ...(config.default || {}),
  ...(config[((typeof window !== 'undefined') && window.__app_mode__) || process.env.APP_MODE] || {}),
};

export default userConfig;
