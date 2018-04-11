import _Array$from from 'babel-runtime/core-js/array/from';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return _Array$from(arr); } }

// <!-- auto generated navs start -->
var autoGenHeaderNavs = [{
  text: '首页',
  to: '/',
  icon: 'home'
}, {
  text: '反馈',
  to: 'https://github.com/alibaba/ice',
  external: true,
  newWindow: true,
  icon: 'message'
}, {
  text: '帮助',
  to: 'https://alibaba.github.io/ice',
  external: true,
  newWindow: true,
  icon: 'bangzhu'
}];

var autoGenAsideNavs = [{
  text: '首页',
  to: '/Dashboard',
  icon: 'home'
}, {
  text: '用户管理',
  to: '/user',
  icon: 'yonghu'
}, {
  text: '系统设置',
  to: '/setting',
  icon: 'shezhi',
  children: [{
    text: '基本设置',
    to: '/general'
  }, {
    text: '评论设置',
    to: '/comment'
  }]
}];
// <!-- auto generated navs end -->

var customHeaderNavs = [];
var customAsideNavs = [];

function transform(navs) {
  // custom logical
  return [].concat(_toConsumableArray(navs));
}

export var headerNavs = transform([].concat(autoGenHeaderNavs, customHeaderNavs));

export var asideNavs = transform([].concat(autoGenAsideNavs, customAsideNavs));