import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Step from '@icedesign/base/lib/step';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var SuccessDetail = (_temp = _class = function (_Component) {
  _inherits(SuccessDetail, _Component);

  function SuccessDetail(props) {
    _classCallCheck(this, SuccessDetail);

    var _this = _possibleConstructorReturn(this, (SuccessDetail.__proto__ || _Object$getPrototypeOf(SuccessDetail)).call(this, props));

    _this.state = {
      value: ['填写信息', '申请审核', '开通账号', '完成'], // 步骤条信息
      current: 1, // 当前步骤
      type: 'dot' // 步骤的类型，可选值: 'circle', 'arrow', 'dot'
    };
    return _this;
  }

  _createClass(SuccessDetail, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          current = _state.current,
          type = _state.type;

      return React.createElement(
        'div',
        { className: 'success-detail', style: styles.successDetail },
        React.createElement(
          IceContainer,
          { style: styles.container },
          React.createElement(
            'div',
            { className: 'success-detail-head', style: styles.successDetailHead },
            React.createElement('img', {
              src: 'https://img.alicdn.com/tfs/TB1ya6gh0zJ8KJjSspkXXbF7VXa-156-156.png',
              style: styles.img,
              alt: ''
            }),
            React.createElement(
              'h3',
              { className: 'title', style: styles.title },
              '\u63D0\u4EA4\u6210\u529F'
            )
          ),
          React.createElement(
            'p',
            { className: 'summary', style: styles.summary },
            '\u672C\u6587\u5B57\u533A\u57DF\u53EF\u4EE5\u5C55\u793A\u7B80\u5355\u7684\u8BF4\u660E'
          ),
          React.createElement(
            'p',
            { className: 'descrpiton', style: styles.descrpiton },
            '\u5982\u679C\u6709\u8DDF\u591A\u7EC6\u8282\u9700\u8981\u5C55\u793A\uFF0C\u53EF\u4EE5\u8865\u5145\u5728\u4E0B\u9762\u8FD9\u91CC\uFF0C\u4E00\u4E9B\u76F8\u5173\u7684\u4ECB\u7ECD\u548C\u63CF\u8FF0'
          ),
          React.createElement(
            _Step,
            { current: current, type: type, style: styles.nextStep },
            value.map(function (item, index) {
              return React.createElement(_Step.Item, { key: index, title: item });
            })
          ),
          React.createElement(
            'div',
            { className: 'buttons', style: styles.buttons },
            React.createElement(
              _Button,
              { type: 'normal', style: styles.btn },
              '\u8FD4\u56DE\u9996\u9875'
            ),
            React.createElement(
              _Button,
              { type: 'primary' },
              '\u67E5\u770B\u66F4\u591A'
            )
          )
        )
      );
    }
  }]);

  return SuccessDetail;
}(Component), _class.displayName = 'SuccessDetail', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SuccessDetail as default };


var styles = {
  container: {
    padding: '80px 40px'
  },
  btn: {
    marginRight: '6px'
  },
  successDetail: {
    textAlign: 'center'
  },
  successDetailHead: {
    position: 'relative'
  },
  img: {
    Width: '40px',
    height: '40px'
  },
  title: {
    margin: 0
  },
  summary: {
    marginBottom: '40px',
    fontSize: '14px',
    color: '#666'
  },
  nextStep: {
    margin: '80px 0'
  }
};