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
    icon: 'question',
  },
];

const autoGenAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '一级目录示例',
    to: '/example1',
    icon: 'align-left',
  },
  {
    text: '二级目录示例',
    to: '/example2',
    icon: 'store',
    children: [
      {
        text: '二级子目录1',
        to: '/example21',
      },
      {
        text: '二级子目录2',
        to: '/example22',
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

export default {
  headerNavs: transform([...autoGenHeaderNavs, ...customHeaderNavs]),
  asideNavs: transform([...autoGenAsideNavs, ...customAsideNavs]),
};
