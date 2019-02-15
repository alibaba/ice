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
  'app.btn.edit': '编辑',
  'app.btn.delete': '删除',
  'app.btn.detail': '详情',
  'app.btn.add': '新增',
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
