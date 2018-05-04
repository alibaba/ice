// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
  },
  {
    name: '文章管理',
    path: '/post',
    icon: 'copy',
    children: [
      { name: '文章列表', path: '/post/list' },
      { name: '添加文章', path: '/post/create' },
    ],
  },
  {
    name: '分类管理',
    path: '/cate',
    icon: 'cascades',
    children: [
      { name: '分类列表', path: '/cate/list' },
      { name: '添加分类', path: '/cate/create' },
    ],
  },
  {
    name: '标签管理',
    path: '/tag',
    icon: 'pin',
    children: [
      { name: '标签列表', path: '/tag/list' },
      { name: '添加标签', path: '/tag/create' },
    ],
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'yonghu',
    children: [
      { name: '用户列表', path: '/user/list' },
      { name: '添加用户', path: '/user/create' },
      { name: '修改密码', path: '/user/pwd' },
    ],
  },
  {
    name: '通用设置',
    path: '/setting',
    icon: 'shezhi',
    children: [
      { name: '基础设置', path: '/setting/basic' },
      {
        name: '菜单设置',
        path: '/setting/navigation',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
