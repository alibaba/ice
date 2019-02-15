import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';
import profile from './profile';
import chart from './chart';
import table from './table';
import list from './list';
import menu from './menu';

export default {
  'app.btn.edit': 'Edit',
  'app.btn.delete': 'Delete',
  'app.btn.detail': 'Detail',
  'app.btn.add': 'Add',
  ...menu,
  ...table,
  ...chart,
  ...result,
  ...dashboard,
  ...setting,
  ...exception,
  ...profile,
  ...list,
};
