import config from '@/config';

interface Config {
  readonly [propName: string]: any;
}

const userConfig: Config = {
  ...(config.default || {}),
  ...(config[process.env.APP_MODE] || {}),
};

export default userConfig;
