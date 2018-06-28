const asideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'cart',
    key: 'home',
  },
  {
    text: '管理',
    icon: 'compass',
    key: 'child',
    children: [
      {
        text: '子页面',
        to: '/child',
        key: 'child'
      }
    ]
  }
];

export default asideNavs;
