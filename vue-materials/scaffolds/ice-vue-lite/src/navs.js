// <!-- auto generated navs start -->
const autoGenAsideNavs = [];
// <!-- auto generated navs end -->

// <!-- custom navs start -->
const customAsideNavs = [
  {
    path: '',
    children: [
      {
        path: '',
        name: 'Dashboard',
        icon: 'el-icon-menu',
      },
    ],
  },
  {
    path: '/table',
    name: '表格',
    icon: 'el-icon-date',
    children: [
      {
        path: 'basic',
        name: '基础表格',
      },
      {
        path: 'fixed',
        name: '固定表格',
      },
    ],
  },
  {
    path: '/form',
    name: '表单',
    icon: 'el-icon-edit-outline',
    children: [
      {
        path: 'basic',
        name: '典型表单',
      },
      {
        path: 'signup',
        name: '注册表单',
      },
    ],
  },
  {
    path: '/charts',
    name: '图表',
    icon: 'el-icon-picture-outline',
    children: [
      {
        path: 'line',
        name: '折线图',
      },
      {
        path: 'histogram',
        name: '柱状图',
      },
      {
        path: 'bar',
        name: '条形图',
      },
    ],
  },
];
// <!-- custom navs start -->

function transform(navs) {
  // custom logical
  return [...navs];
}

const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);

export default asideNavs;

