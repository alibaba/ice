import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Progress from '@icedesign/base/lib/progress';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import { enquireScreen } from 'enquire-js';

var Row = _Grid.Row,
    Col = _Grid.Col;
var ProgressDataList = (_temp = _class = function (_Component) {
  _inherits(ProgressDataList, _Component);

  function ProgressDataList(props) {
    _classCallCheck(this, ProgressDataList);

    var _this = _possibleConstructorReturn(this, (ProgressDataList.__proto__ || _Object$getPrototypeOf(ProgressDataList)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(ProgressDataList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          Row,
          { wrap: true },
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.dataItem },
            React.createElement(
              'div',
              { style: styles.dataTitle },
              '\u603B\u6536\u5165'
            ),
            React.createElement(
              'div',
              { style: styles.dataIntro },
              '\u6240\u6709\u9879\u76EE\u6536\u5165'
            ),
            React.createElement(
              'div',
              { style: styles.dataValue },
              '\uFFE510M'
            ),
            React.createElement(
              'div',
              { style: styles.dataProgress },
              React.createElement(_Progress, { percent: 30, showInfo: false })
            ),
            React.createElement(
              'div',
              { style: styles.dataExtra },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { style: styles.settingsLink, href: '#' },
                  '\u8BBE\u7F6E'
                )
              ),
              React.createElement(
                'div',
                null,
                '30%'
              )
            ),
            !this.state.isMobile && React.createElement('div', { style: styles.verticalLine })
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.dataItem },
            React.createElement(
              'div',
              { style: styles.dataTitle },
              '\u4ECA\u5E74\u65B0\u7528\u6237'
            ),
            React.createElement(
              'div',
              { style: styles.dataIntro },
              '\u4ECA\u5E74\u65B0\u6CE8\u518C\u7528\u6237'
            ),
            React.createElement(
              'div',
              { style: styles.dataValue },
              '2000'
            ),
            React.createElement(
              'div',
              { style: styles.dataProgress },
              React.createElement(_Progress, { percent: 80, showInfo: false })
            ),
            React.createElement(
              'div',
              { style: styles.dataExtra },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { style: styles.settingsLink, href: '#' },
                  '\u8BBE\u7F6E'
                )
              ),
              React.createElement(
                'div',
                null,
                '80%'
              )
            ),
            !this.state.isMobile && React.createElement('div', { style: styles.verticalLine })
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.dataItem },
            React.createElement(
              'div',
              { style: styles.dataTitle },
              '\u672C\u6708\u65B0\u8BA2\u5355'
            ),
            React.createElement(
              'div',
              { style: styles.dataIntro },
              '\u672C\u6708\u65B0\u589E\u8BA2\u5355\u6570'
            ),
            React.createElement(
              'div',
              { style: styles.dataValue },
              '579'
            ),
            React.createElement(
              'div',
              { style: styles.dataProgress },
              React.createElement(_Progress, { percent: 60, showInfo: false })
            ),
            React.createElement(
              'div',
              { style: styles.dataExtra },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { style: styles.settingsLink, href: '#' },
                  '\u8BBE\u7F6E'
                )
              ),
              React.createElement(
                'div',
                null,
                '60%'
              )
            ),
            !this.state.isMobile && React.createElement('div', { style: styles.verticalLine })
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.dataItem },
            React.createElement(
              'div',
              { style: styles.dataTitle },
              '\u7528\u6237\u53CD\u9988\u5F85\u5904\u7406'
            ),
            React.createElement(
              'div',
              { style: styles.dataIntro },
              '\u7528\u6237\u53CD\u9988\u5F85\u5904\u7406\u7684\u6570\u91CF'
            ),
            React.createElement(
              'div',
              { style: styles.dataValue },
              '10'
            ),
            React.createElement(
              'div',
              { style: styles.dataProgress },
              React.createElement(_Progress, { percent: 10, showInfo: false })
            ),
            React.createElement(
              'div',
              { style: styles.dataExtra },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { style: styles.settingsLink, href: '#' },
                  '\u8BBE\u7F6E'
                )
              ),
              React.createElement(
                'div',
                null,
                '10%'
              )
            )
          )
        )
      );
    }
  }]);

  return ProgressDataList;
}(Component), _class.displayName = 'ProgressDataList', _class.defaultProps = {}, _temp);
export { ProgressDataList as default };


var styles = {
  dataItem: {
    margin: '10px 0',
    padding: '0 30px',
    position: 'relative'
  },
  dataTitle: {
    fontWeight: 'bold'
  },
  dataIntro: {
    marginTop: 10,
    color: '#999'
  },
  dataValue: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 30,
    color: '#3080fe'
  },
  dataProgress: {
    marginTop: 20
  },
  dataExtra: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    color: '#999'
  },
  settingsLink: {
    color: '#999'
  },
  verticalLine: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    right: 0,
    width: 0,
    borderLeft: '1px solid #eee'
  }
};