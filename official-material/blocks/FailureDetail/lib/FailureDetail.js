import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

var FailureDetail = (_temp = _class = function (_Component) {
  _inherits(FailureDetail, _Component);

  function FailureDetail(props) {
    _classCallCheck(this, FailureDetail);

    var _this = _possibleConstructorReturn(this, (FailureDetail.__proto__ || _Object$getPrototypeOf(FailureDetail)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(FailureDetail, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'failure-detail', style: styles.failureDetail },
        React.createElement(
          IceContainer,
          { style: styles.card },
          React.createElement(
            'div',
            { style: styles.successDetailHead },
            React.createElement('img', {
              style: styles.img,
              src: 'https://img.alicdn.com/tfs/TB1LUMhhY_I8KJjy1XaXXbsxpXa-156-156.png',
              alt: ''
            }),
            React.createElement(
              'h3',
              { style: styles.title },
              '\u63D0\u4EA4\u5931\u8D25'
            )
          ),
          React.createElement(
            'p',
            { style: styles.summary },
            '\u63D0\u4F9B\u4FE1\u606F\u4E0D\u7B26\u5408\u8981\u6C42\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4'
          ),
          React.createElement(
            'p',
            { style: styles.descrpiton },
            '\u5982\u679C\u6709\u66F4\u591A\u7EC6\u8282\u9700\u8981\u5C55\u793A\uFF0C\u53EF\u4EE5\u8865\u5145\u5728\u8FD9\u91CC\uFF0C\u4E00\u4E9B\u76F8\u5173\u7684\u4ECB\u7ECD\u548C\u63CF\u8FF0'
          ),
          React.createElement(
            'a',
            { href: '/', style: styles.backToLink },
            '\u8FD4\u56DE\u4FEE\u6539'
          )
        )
      );
    }
  }]);

  return FailureDetail;
}(Component), _class.displayName = 'FailureDetail', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FailureDetail as default };


var styles = {
  failureDetail: {
    textAlign: 'center'
  },
  img: {
    width: '40px',
    height: '40px'
  },
  successDetailHead: {
    position: 'relative'
  },
  title: {
    margin: 0,
    fontWeight: 'bold'
  },
  summary: {
    marginBottom: '40px',
    fontSize: '14px',
    color: '#666'
  },
  descrpiton: {
    fontSize: '14px',
    color: '#666'
  },
  backToLink: {
    display: 'inline-block',
    marginTop: '80px',
    height: '28px',
    padding: '0 16px',
    fontSize: '14px',
    lineHeight: '26px',
    color: '#fff',
    borderRadius: '50px',
    backgroundColor: '#3080fe'
  },
  card: {
    padding: '80px 40px'
  }
};