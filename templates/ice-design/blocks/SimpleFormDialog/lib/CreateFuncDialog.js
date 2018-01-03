'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 包装 Dialog 类组件，使其支持 show、hide 这种命令式调用
var CreateFuncDialog = function CreateFuncDialog(WrapperElement) {
  var instance = null;
  var container = document.createElement('div');
  document.body.appendChild(container);

  return {
    // 创建并打开一个弹窗，并传入初始化的 props
    show: function show(props) {
      // 如果已经有实例打开了，则不会继续打开
      if (instance) {
        return;
      }
      instance = _reactDom2.default.render(_react2.default.createElement(WrapperElement, _extends({}, props, { visible: true })), container);
    },
    // 隐藏并销毁弹窗
    hide: function hide() {
      if (instance) {
        instance.setState({
          visible: false
        }, function () {
          setTimeout(function () {
            _reactDom2.default.unmountComponentAtNode(container);
            instance = null;
          }, 1000);
        });
      }
    }
  };
};

exports.default = CreateFuncDialog;
module.exports = exports['default'];