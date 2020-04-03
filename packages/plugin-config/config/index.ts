import config from '@/config';

interface Config {
  readonly [propName: string]: any;
}

const userConfig: Config = {
  ...(config.default || {}),
  // webpack will automatically convert global to window when target is web
  ...(config[(global as any).__app_mode__ || process.env.APP_MODE] || {}),
};

export default userConfig;
