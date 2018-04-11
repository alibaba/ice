import _Object$assign from 'babel-runtime/core-js/object/assign';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import ReactDOM from 'react-dom';

// 包装 Dialog 类组件，使其支持 show、hide 这种命令式调用
var CreateFuncDialog = function CreateFuncDialog(WrapperElement) {
  var instance = null;
  var container = null;

  return {
    // 创建并打开一个弹窗，并传入初始化的 props
    show: function show(props) {
      // 如果已经有实例打开了，则不会继续打开
      if (instance) {
        return;
      }

      container = document.createElement('div'); /* eslint no-undef: "off" */
      document.body.appendChild(container);
      instance = ReactDOM.render(React.createElement(WrapperElement, _extends({}, props, { visible: true })), container);
    },
    // 隐藏并销毁弹窗
    hide: function hide() {
      if (instance) {
        instance.setState({
          visible: false
        }, function () {
          setTimeout(function () {
            ReactDOM.unmountComponentAtNode(container);
            instance = null;
            container.parentNode.removeChild(container);
          }, 1000);
        });
      }
    }
  };
};

export default CreateFuncDialog;