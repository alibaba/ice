import { USER_CONFIG } from '../constant';

export default (api) => {
  const { registerUserConfig } = api;
  USER_CONFIG.forEach(item => registerUserConfig({ ...item }));
};
