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
    to: '/messages',
    icon: 'mail',
  },
  {
    text: '日历',
    to: '/calendar',
    icon: 'task',
  },
  {
    text: '网盘',
    to: '/drive',
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
