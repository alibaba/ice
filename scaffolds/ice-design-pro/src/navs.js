// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];
// <!-- auto generated navs end -->

const customHeaderNavs = [
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
    icon: 'home2',
  },
  {
    text: '图表页',
    to: '/chart',
    icon: 'chart1',
    children: [
      {
        text: '常用图表',
        to: '/chart/chart-list',
      },
    ],
  },
  {
    text: '表格页',
    to: '/table',
    icon: 'table',
    children: [
      {
        text: '基础表格',
        to: '/table/basic-table',
      },
      {
        text: '常用竖向表格',
        to: '/table/table-display',
      },
    ],
  },
  {
    text: '列表页',
    to: '/list',
    icon: 'ul-list',
    children: [
      {
        text: '搜索列表',
        to: '/list/article-list',
      },
      {
        text: '卡片列表',
        to: '/list/card-list',
      },
    ],
  },
  {
    text: '内容页',
    to: '/portlets',
    icon: 'publish',
    children: [
      {
        text: '基础详情页',
        to: '/portlets/base',
      },
      {
        text: '条款协议页',
        to: '/portlets/terms',
      },
    ],
  },
  {
    text: '结果页',
    to: '/result',
    icon: 'result',
    children: [
      {
        text: '成功',
        to: '/result/success',
      },
      {
        text: '失败',
        to: '/result/fail',
      },
    ],
  },
  {
    text: '异常页',
    to: '/exception',
    icon: 'gaojingxinxi',
    children: [
      {
        text: '204',
        to: '/exception/204',
      },
      {
        text: '403',
        to: '/exception/403',
      },
      {
        text: '404',
        to: '/exception/404',
      },
      {
        text: '500',
        to: '/exception/500',
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
