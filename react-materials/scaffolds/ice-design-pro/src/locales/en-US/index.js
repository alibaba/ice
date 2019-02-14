import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';

export default {
  ...result,
  ...dashboard,
  ...setting,
  ...exception,
};
