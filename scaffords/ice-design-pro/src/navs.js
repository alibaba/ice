// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];

const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '反馈',
    to: 'https://github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
  },
  {
    text: '更多',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
  },
];
const customAsideNavs = [
  {
    text: 'Dashboard',
    to: '/',
    icon: 'nav-list',
  },
  {
    text: '介绍页',
    to: '/landing',
    icon: 'process',
  },
  {
    text: '图表页',
    to: '/charts',
    icon: 'electronics',
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
    icon: 'category',
    children: [
      {
        text: '搜索列表',
        to: '/list/article-list',
      },
      {
        text: '卡片列表',
        to: '/list/card-list',
      },
      {
        text: '素材列表',
        to: '/list/picture-list',
      },
    ],
  },
  {
    text: '内容页',
    to: '/portlets',
    icon: 'office',
    children: [
      {
        text: '基础详情页',
        to: '/portlets/base',
      },
      {
        text: '条款协议页',
        to: '/portlets/terms',
      },
      {
        text: '进度展示页',
        to: '/portlets/progress',
      },
    ],
  },
  {
    text: '结果页',
    to: '/result',
    icon: 'form',
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
    icon: 'process',
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

export default {
  headerNavs: transform([...autoGenHeaderNavs, ...customHeaderNavs]),
  asideNavs: transform([...autoGenAsideNavs, ...customAsideNavs]),
};
