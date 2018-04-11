import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var Row = _Grid.Row,
    Col = _Grid.Col;
var CollapseCard = (_temp = _class = function (_Component) {
  _inherits(CollapseCard, _Component);

  function CollapseCard(props) {
    _classCallCheck(this, CollapseCard);

    var _this = _possibleConstructorReturn(this, (CollapseCard.__proto__ || _Object$getPrototypeOf(CollapseCard)).call(this, props));

    _this.toggleCollapse = function () {
      var collapse = _this.state.collapse;

      _this.setState({
        collapse: !collapse
      });
    };

    _this.state = {
      collapse: false
    };
    return _this;
  }

  _createClass(CollapseCard, [{
    key: 'render',
    value: function render() {
      var collapse = this.state.collapse;

      var collapseStyle = collapse ? styles.collapse : null;
      return React.createElement(
        'div',
        { className: 'collapse-card' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.summaryInfo },
            React.createElement('img', {
              style: styles.itemLogo,
              src: 'https://img.alicdn.com/tfs/TB1EBQ.hZLJ8KJjy0FnXXcFDpXa-300-300.png',
              alt: ''
            }),
            React.createElement(
              'div',
              { style: styles.infoIntro },
              React.createElement(
                'h3',
                { style: styles.infoTitle },
                '\u6234\u68EE'
              ),
              React.createElement(
                'p',
                { style: styles.infoDesc },
                '\u4F5C\u4E3A\u4E00\u5BB6\u82F1\u56FD\u521B\u65B0\u79D1\u6280\u516C\u53F8,\u6234\u68EE\u81F4\u529B\u4E8E\u8BBE\u8BA1\u548C\u7814\u53D1\u80FD\u7528\u79D1\u6280\u6765\u7B80\u5316\u4EBA\u4EEC\u751F\u6D3B\u7684\u4EA7\u54C1.\u6234\u68EE\u5B98\u65B9\u65D7\u8230\u5E97\u4FDD\u4FEE\u957F\u8FBE5\u5E74,\u60A8\u53EF\u4EE5\u5728\u6234\u68EE\u5B98\u65B9\u8054\u7EDC\u4E2D\u5FC3\u8D2D\u4E70\u96F6\u4EF6,\u6BCF\u54687\u5929\u63D0\u4F9B\u670D\u52A1',
                ' '
              )
            )
          ),
          React.createElement(
            Row,
            { style: _extends({}, styles.baseInfo, collapseStyle) },
            React.createElement(
              Col,
              { xxs: '24', xs: '12', s: '12', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u6D3B\u52A8\u6807\u9898\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '\u6234\u68EE\u5468\u5E74\u5E86\u6D3B\u52A8'
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', xs: '12', s: '12', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u5E97\u94FA\u540D\u79F0\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '\u6234\u68EE\u5468\u5E74\u5E86\u6D3B\u52A8'
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', xs: '12', s: '12', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u5F00\u59CB\u65F6\u95F4\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '2017-10-18 12:20:07'
              )
            ),
            React.createElement(
              Col,
              { xxs: '24', xs: '12', s: '12', l: '12', style: styles.infoItem },
              React.createElement(
                'span',
                { style: styles.infoItemLabel },
                '\u7ED3\u675F\u65F6\u95F4\uFF1A'
              ),
              React.createElement(
                'span',
                { style: styles.infoItemValue },
                '2017-12-18 12:20:07'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'toggle-btn', style: styles.toggleBtn },
            React.createElement(
              'a',
              {
                className: 'toggle-btn',
                style: styles.toggleBtn,
                onClick: this.toggleCollapse
              },
              React.createElement(
                'span',
                { style: { marginRight: '5px' } },
                collapse ? '更多信息' : '收起'
              ),
              React.createElement(_Icon, { size: 'xs', type: collapse ? 'arrow-down' : 'arrow-up' })
            )
          )
        )
      );
    }
  }]);

  return CollapseCard;
}(Component), _class.displayName = 'CollapseCard', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { CollapseCard as default };


var styles = {
  collapse: {
    display: 'none'
  },
  summaryInfo: {
    display: 'flex',
    borderBottom: '1px solid #e7e7eb'
  },
  baseInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '20px'
  },
  infoItem: {
    width: '50%',
    marginBottom: '15px'
  },
  infoItemLabel: {
    color: '#999'
  },
  itemLogo: {
    width: '100px',
    height: '100px'
  },
  infoIntro: {
    marginLeft: '20px',
    paddingBottom: '20px'
  },
  infoTitle: {
    fontWeight: 'bold'
  },
  infoDesc: {
    color: '#999'
  },
  toggleBtn: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#999',
    textDecoration: 'none',
    cursor: 'pointer'
  }
};