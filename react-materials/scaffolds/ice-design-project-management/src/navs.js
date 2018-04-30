// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];

const autoGenAsideNavs = [
  {
    text: '任务',
    to: '/',
    icon: 'home2',
  },
  {
    text: '消息',
    to: '/goods',
    icon: 'mail',
  },
  {
    text: '日历',
    to: '/customer',
    icon: 'task',
  },
  {
    text: '网盘',
    to: '/asset',
    icon: 'attachment',
  },
];
// <!-- auto generated navs end -->

const customHeaderNavs = [];
const customAsideNavs = [];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
