import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';
import portlets from './portlets';
import chart from './chart';
import table from './table';

export default {
  ...table,
  ...chart,
  ...result,
  ...dashboard,
  ...setting,
  ...exception,
  ...portlets,
};
