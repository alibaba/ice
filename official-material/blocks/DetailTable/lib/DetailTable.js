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

var DetailTable = (_temp = _class = function (_Component) {
  _inherits(DetailTable, _Component);

  function DetailTable(props) {
    _classCallCheck(this, DetailTable);

    var _this = _possibleConstructorReturn(this, (DetailTable.__proto__ || _Object$getPrototypeOf(DetailTable)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DetailTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'detail-table' },
        React.createElement(
          IceContainer,
          { title: '\u4EFB\u52A1\u8BE6\u60C5' },
          React.createElement(
            'ul',
            { style: styles.detailTable },
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u4EFB\u52A1\u6807\u9898\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                '\u96C6\u76D2\u5BB6\u5C45\u65D7\u8230\u5E97\u53CC\u5341\u4E00\u6D3B\u52A8'
              )
            ),
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u5355\u4E2A\u4EFB\u52A1\u91D1\u989D\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                '\xA5 1000.00'
              )
            ),
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u63A5\u5355\u65F6\u95F4\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                '2017-10-18 12:20:07'
              )
            ),
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u5546\u5BB6\u8054\u7CFB\u65B9\u5F0F\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                '15112111213'
              )
            ),
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u4EFB\u52A1\u72B6\u6001\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                React.createElement(
                  'span',
                  { style: styles.statusProcessing },
                  '\u8FDB\u884C\u4E2D'
                )
              )
            ),
            React.createElement(
              'li',
              { style: styles.detailItem },
              React.createElement(
                'div',
                { style: styles.detailTitle },
                '\u6536\u8D27\u5730\u5740\uFF1A'
              ),
              React.createElement(
                'div',
                { style: styles.detailBody },
                '\u6D59\u6C5F\u7701\u676D\u5DDE\u5E02\u4F59\u676D\u533A\u6587\u4E00\u897F\u8DEF969\u53F7\u6DD8\u5B9D\u57CE'
              )
            )
          )
        )
      );
    }
  }]);

  return DetailTable;
}(Component), _class.displayName = 'DetailTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { DetailTable as default };


var styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3'
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999'
  },
  detailBody: {
    flex: 1
  },
  statusProcessing: {
    color: '#64D874'
  }
};