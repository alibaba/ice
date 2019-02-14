import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';
import portlets from './portlets';
import chart from './chart';

export default {
  ...chart,
  ...result,
  ...dashboard,
  ...setting,
  ...exception,
  ...portlets,
};
