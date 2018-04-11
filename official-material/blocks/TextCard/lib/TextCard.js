import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
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

import './TextCard.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var TextCard = (_temp = _class = function (_Component) {
  _inherits(TextCard, _Component);

  function TextCard(props) {
    _classCallCheck(this, TextCard);

    var _this = _possibleConstructorReturn(this, (TextCard.__proto__ || _Object$getPrototypeOf(TextCard)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TextCard, [{
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
            { xxs: '12', s: '12', l: '8', style: styles.textCardItem },
            React.createElement(
              'div',
              { style: styles.textCardSubtitle },
              '\u6211\u7684\u5F85\u529E'
            ),
            React.createElement(
              'div',
              { className: 'text-card-title', style: styles.textCardTitle },
              React.createElement(
                'span',
                { className: 'text-card-number', style: styles.textCardNumber },
                '8'
              ),
              '\u4E2A\u4EFB\u52A1'
            )
          ),
          React.createElement(
            Col,
            { xxs: '12', s: '12', l: '8', style: styles.textCardItem },
            React.createElement(
              'div',
              { style: styles.textCardSubtitle },
              '\u672C\u5468\u4EFB\u52A1\u5E73\u5747\u5904\u7406\u65F6\u95F4'
            ),
            React.createElement(
              'div',
              { className: 'text-card-title', style: styles.textCardTitle },
              React.createElement(
                'span',
                { className: 'text-card-number', style: styles.textCardNumber },
                '32'
              ),
              '\u5206\u949F'
            )
          ),
          React.createElement(
            Col,
            {
              xxs: '12',
              s: '12',
              l: '8',
              style: _extends({}, styles.textCardItem, { borderRight: 0 })
            },
            React.createElement(
              'div',
              { style: styles.textCardSubtitle },
              '\u672C\u5468\u5B8C\u6210\u4EFB\u52A1\u6570'
            ),
            React.createElement(
              'div',
              { className: 'text-card-title', style: styles.textCardTitle },
              React.createElement(
                'span',
                { className: 'text-card-number', style: styles.textCardNumber },
                '23'
              ),
              '\u4E2A\u4EFB\u52A1'
            )
          )
        )
      );
    }
  }]);

  return TextCard;
}(Component), _class.displayName = 'TextCard', _temp);
export { TextCard as default };


var styles = {
  textCardItem: {
    borderRight: '1px solid #F0F0F0',
    height: '90px',
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCardSubtitle: {
    fontSize: '12px',
    marginBottom: '10px'
  },
  textCardTitle: {
    fontSize: '16px'
  },
  textCardNumber: {
    fontSize: '24px',
    fontWeight: 'bold'
  }
};