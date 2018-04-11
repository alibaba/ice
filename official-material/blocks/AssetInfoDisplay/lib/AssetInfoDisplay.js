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
var AssetInfoDisplay = (_temp = _class = function (_Component) {
  _inherits(AssetInfoDisplay, _Component);

  function AssetInfoDisplay(props) {
    _classCallCheck(this, AssetInfoDisplay);

    var _this = _possibleConstructorReturn(this, (AssetInfoDisplay.__proto__ || _Object$getPrototypeOf(AssetInfoDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(AssetInfoDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'asset-info-display', style: styles.container },
        React.createElement(
          Row,
          { gutter: '20', wrap: true, style: styles.containerContent },
          React.createElement(
            Col,
            { xxs: '24', s: '12' },
            React.createElement(
              IceContainer,
              { style: styles.card },
              React.createElement(
                'div',
                { style: styles.title },
                '\u8D44\u4EA7\u5C55\u793A'
              ),
              React.createElement(
                'div',
                { style: styles.assets },
                React.createElement(
                  'div',
                  { style: styles.assetItem },
                  React.createElement(
                    'div',
                    { style: styles.price },
                    '$46.24'
                  ),
                  React.createElement(
                    'a',
                    { href: '##', style: styles.subItem },
                    '\u53EF\u7528\u989D\u5EA6 ',
                    React.createElement(_Icon, { type: 'help', size: 's' })
                  )
                ),
                React.createElement(
                  'div',
                  { style: styles.assetItem },
                  React.createElement(
                    'div',
                    { style: styles.price },
                    '$46.24'
                  ),
                  React.createElement(
                    'a',
                    { href: '##', style: styles.subItem },
                    '\u73B0\u91D1\u4F59\u989D ',
                    React.createElement(_Icon, { type: 'help', size: 's' })
                  )
                ),
                React.createElement(
                  'div',
                  {
                    style: _extends({}, styles.assetItem, {
                      borderRight: '0'
                    })
                  },
                  React.createElement(
                    'div',
                    { style: styles.price },
                    '$46.24'
                  ),
                  React.createElement(
                    'a',
                    { href: '##', style: styles.subItem },
                    '\u4FE1\u7528\u989D\u5EA6 ',
                    React.createElement(_Icon, { type: 'help', size: 's' })
                  )
                )
              ),
              React.createElement(
                'div',
                { style: styles.cardItem },
                React.createElement(
                  'h1',
                  { style: styles.subTitle },
                  '\u4F18\u60E0\u5361\u5238'
                ),
                React.createElement(
                  'div',
                  { style: styles.assetsGroup },
                  React.createElement(
                    'div',
                    { style: styles.assetItem },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '$100'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u50A8\u503C\u5361'
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: styles.assetItem },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '$0'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u4F18\u60E0\u5238'
                    )
                  ),
                  React.createElement(
                    'div',
                    {
                      style: _extends({}, styles.assetItem, {
                        borderRight: '0'
                      })
                    },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '$3000'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u4EE3\u91D1\u5238'
                    )
                  )
                )
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12' },
            React.createElement(
              IceContainer,
              { style: styles.card },
              React.createElement(
                'div',
                { style: styles.title },
                '\u5408\u540C\u53D1\u7968'
              ),
              React.createElement(
                'div',
                {
                  style: _extends({}, styles.cardItem, {
                    borderBottom: '1px solid #fbfbfb'
                  })
                },
                React.createElement(
                  'h1',
                  { style: styles.subTitle },
                  '\u5408\u540C'
                ),
                React.createElement(
                  'div',
                  { style: styles.assetsGroup },
                  React.createElement(
                    'a',
                    { href: '##', style: styles.assetItem },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '0'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u6B63\u5F0F'
                    )
                  ),
                  React.createElement(
                    'a',
                    {
                      href: '##',
                      style: _extends({}, styles.assetItem, {
                        borderRight: '0'
                      })
                    },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '1'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u8349\u7A3F'
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { style: styles.cardItem },
                React.createElement(
                  'h1',
                  { style: styles.subTitle },
                  '\u53D1\u7968'
                ),
                React.createElement(
                  'div',
                  { style: styles.assetsGroup },
                  React.createElement(
                    'a',
                    { href: '##', style: styles.assetItem },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '$182.13'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u6B63\u5F0F'
                    )
                  ),
                  React.createElement(
                    'a',
                    {
                      href: '##',
                      style: _extends({}, styles.assetItem, {
                        borderRight: '0'
                      })
                    },
                    React.createElement(
                      'div',
                      { style: styles.item },
                      '$0'
                    ),
                    React.createElement(
                      'div',
                      { style: styles.subItem },
                      '\u53D1\u7968'
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AssetInfoDisplay;
}(Component), _class.displayName = 'AssetInfoDisplay', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { AssetInfoDisplay as default };


var styles = {
  containerContent: {
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  gap: {
    flex: '0 0 20px'
  },
  card: {
    flex: 1,
    padding: 0
  },
  title: {
    color: '#6ca1ee',
    fontSize: '16px',
    padding: '20px',
    borderBottom: '1px solid #fbfbfb'
  },
  subTitle: {
    color: '#666',
    fontWeight: '400',
    borderLeft: '4px solid #6ca1ee',
    fontSize: '16px',
    lineHeight: '1.4em',
    paddingLeft: '5px',
    marginBottom: '12px'
  },
  assets: {
    height: '116px',
    borderBottom: '1px solid #fbfbfb',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardItem: {
    padding: '5px 20px'
  },
  assetsGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  assetItem: {
    flex: 1,
    borderRight: '1px solid #fbfbfb',
    textAlign: 'center',
    color: '#666'
  },
  price: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#fbb848'
  },
  item: {
    marginBottom: '10px',
    fontWeight: '800',
    fontSize: '16px'
  },
  subItem: {
    color: '#999',
    marginBottom: '12px'
  }
};