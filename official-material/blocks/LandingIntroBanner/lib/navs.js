import _Array$from from 'babel-runtime/core-js/array/from';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return _Array$from(arr); } }

// <!-- auto generated navs start -->
var autoGenHeaderNavs = [{
  text: '首页',
  to: '/'
}, {
  text: '反馈',
  to: 'https://github.com/alibaba/ice',
  external: true,
  newWindow: true
}, {
  text: '帮助',
  to: 'https://alibaba.github.io/ice',
  external: true,
  newWindow: true
}];

var autoGenAsideNavs = [{
  text: '首页',
  to: '/',
  icon: 'store'
}, {
  text: '一级目录示例',
  to: '/example1',
  icon: 'nav-list'
}, {
  text: '二级目录示例',
  to: '/example2',
  icon: 'compass',
  children: [{
    text: '二级子目录1',
    to: '/example21'
  }, {
    text: '二级子目录2',
    to: '/example22'
  }]
}];
// <!-- auto generated navs end -->

var customHeaderNavs = [];
var customAsideNavs = [];

function transform(navs) {
  // custom logical
  return [].concat(_toConsumableArray(navs));
}

export default {
  headerNavs: transform([].concat(autoGenHeaderNavs, customHeaderNavs)),
  asideNavs: transform([].concat(autoGenAsideNavs, customAsideNavs))
};