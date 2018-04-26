// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];

const autoGenAsideNavs = [
  {
    text: '概况',
    to: '/',
    icon: 'home2',
  },
  {
    text: '商品',
    to: '/goods',
    icon: 'shopcar',
  },
  {
    text: '订单',
    to: '/order',
    icon: 'copy',
  },
  {
    text: '客户',
    to: '/customer',
    icon: 'redpacket',
  },
  {
    text: '数据',
    to: '/statcenter',
    icon: 'chart',
  },
  {
    text: '资产',
    to: '/asset',
    icon: 'redpacket',
  },
  {
    text: '设置',
    to: '/setting',
    icon: 'shezhi',
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
