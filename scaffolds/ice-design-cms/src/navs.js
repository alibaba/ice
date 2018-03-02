// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];
// <!-- auto generated navs end -->

const customHeaderNavs = [
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

const customAsideNavs = [
  {
    text: 'Dashboard',
    to: '/',
    icon: 'home',
  },
  {
    text: '文章管理',
    to: '/post',
    icon: 'copy',
    children: [
      { text: '文章列表', to: '/post/list' },
      { text: '添加文章', to: '/post/create' },
    ],
  },
  {
    text: '分类管理',
    to: '/cate',
    icon: 'cascades',
    children: [
      { text: '分类列表', to: '/cate/list' },
      { text: '添加分类', to: '/cate/create' },
    ],
  },
  {
    text: '标签管理',
    to: '/tag',
    icon: 'pin',
    children: [
      { text: '标签列表', to: '/tag/list' },
      { text: '添加标签', to: '/tag/create' },
    ],
  },
  {
    text: '用户管理',
    to: '/user',
    icon: 'yonghu',
    children: [
      { text: '用户列表', to: '/user/list' },
      { text: '添加用户', to: '/user/create' },
      { text: '修改密码', to: '/user/pwd' },
    ],
  },
  {
    text: '通用设置',
    to: '/setting',
    icon: 'shezhi',
    children: [
      { text: '基础设置', to: '/setting/basic' },
      {
        text: '菜单设置',
        to: '/setting/navigation',
      },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
