// <!-- auto generated navs start -->
const autoGenHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '反馈',
    to: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    text: '帮助',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const autoGenAsideNavs = [
  {
    text: '首页',
    to: '/Dashboard',
    icon: 'home',
  },
  {
    text: '用户管理',
    to: '/user',
    icon: 'yonghu',
  },
  {
    text: '系统设置',
    to: '/setting',
    icon: 'shezhi',
    children: [
      {
        text: '基本设置',
        to: '/general',
      },
      {
        text: '评论设置',
        to: '/comment',
      },
    ],
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
