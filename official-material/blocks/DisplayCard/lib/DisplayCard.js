import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Balloon from '@icedesign/base/lib/balloon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import './DisplayCard.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;

var _default = (_temp = _class = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || _Object$getPrototypeOf(_default)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var down = React.createElement('img', {
        src: 'https://gw.alicdn.com/tfs/TB1ReMsh3vD8KJjy0FlXXagBFXa-12-18.png',
        style: styles.down,
        alt: ''
      });
      var up = React.createElement('img', {
        src: 'https://gw.alicdn.com/tfs/TB1Q1Msh3vD8KJjy0FlXXagBFXa-12-18.png',
        style: styles.up,
        alt: ''
      });

      return React.createElement(
        IceContainer,
        { className: 'display-card-container', style: styles.container },
        React.createElement(
          Row,
          { wrap: true },
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.item },
            React.createElement(
              'div',
              { style: styles.title, className: 'title' },
              '\u6628\u65E5\u5185\u5BB9\u6D4F\u89C8\u6B21\u6570',
              React.createElement(
                'span',
                { style: styles.extraIcon },
                React.createElement(
                  _Balloon,
                  {
                    trigger: React.createElement('img', {
                      src: 'https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png',
                      alt: '',
                      width: '12',
                      height: '12'
                    }),
                    triggerType: 'hover',
                    closable: false
                  },
                  '\u8FD9\u91CC\u662F\u6570\u636E\u8BF4\u660E'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'count', style: styles.count },
              '46,657'
            ),
            React.createElement(
              'div',
              { style: styles.desc, className: 'desc' },
              React.createElement(
                'span',
                null,
                '\u8F83\u524D\u65E5 ',
                down,
                ' -200'
              ),
              React.createElement(
                'span',
                { style: { marginLeft: 5 } },
                '\u8FD17\u5929 ',
                up,
                ' +100'
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.item },
            React.createElement(
              'div',
              { style: styles.title, className: 'title' },
              '\u6628\u65E5\u8D26\u53F7\u4E3B\u9875\u6D4F\u89C8\u4EBA\u6570',
              React.createElement(
                'span',
                { style: styles.extraIcon },
                React.createElement(
                  _Balloon,
                  {
                    trigger: React.createElement('img', {
                      src: 'https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png',
                      alt: '',
                      width: '12',
                      height: '12'
                    }),
                    triggerType: 'hover',
                    closable: false
                  },
                  '\u8FD9\u91CC\u662F\u6570\u636E\u8BF4\u660E'
                )
              )
            ),
            React.createElement(
              'div',
              { style: styles.count, className: 'count' },
              '533'
            ),
            React.createElement(
              'div',
              { style: styles.desc, className: 'desc' },
              React.createElement(
                'span',
                null,
                '\u8F83\u524D\u65E5 ',
                down,
                ' -200'
              ),
              React.createElement(
                'span',
                { style: { marginLeft: 5 } },
                '\u8FD17\u5929 ',
                up,
                ' +100'
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.item },
            React.createElement(
              'div',
              { style: styles.title, className: 'title' },
              '\u6628\u65E5\u6D3B\u8DC3\u7C89\u4E1D\u6570',
              React.createElement(
                'span',
                { style: styles.extraIcon },
                React.createElement(
                  _Balloon,
                  {
                    trigger: React.createElement('img', {
                      src: 'https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png',
                      alt: '',
                      width: '12',
                      height: '12'
                    }),
                    triggerType: 'hover',
                    closable: false
                  },
                  '\u8FD9\u91CC\u662F\u6570\u636E\u8BF4\u660E'
                )
              )
            ),
            React.createElement(
              'div',
              { style: styles.count, className: 'count' },
              '2233'
            ),
            React.createElement(
              'div',
              { style: styles.desc, className: 'desc' },
              React.createElement(
                'span',
                null,
                '\u8F83\u524D\u65E5 ',
                down,
                ' -200'
              ),
              React.createElement(
                'span',
                { style: { marginLeft: 5 } },
                '\u8FD17\u5929 ',
                up,
                ' +100'
              )
            )
          ),
          React.createElement(
            Col,
            { xxs: '24', s: '12', l: '6', style: styles.item },
            React.createElement(
              'div',
              { style: styles.title, className: 'title' },
              '\u6628\u65E5\u7C89\u4E1D\u6570',
              React.createElement(
                'span',
                { style: styles.extraIcon },
                React.createElement(
                  _Balloon,
                  {
                    trigger: React.createElement('img', {
                      src: 'https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png',
                      alt: '',
                      width: '12',
                      height: '12'
                    }),
                    triggerType: 'hover',
                    closable: false
                  },
                  '\u8FD9\u91CC\u662F\u6570\u636E\u8BF4\u660E'
                )
              )
            ),
            React.createElement(
              'div',
              { style: styles.count, className: 'count' },
              '23,333'
            ),
            React.createElement(
              'div',
              { style: styles.desc, className: 'desc' },
              React.createElement(
                'span',
                null,
                '\u8F83\u524D\u65E5 ',
                down,
                ' -200'
              ),
              React.createElement(
                'span',
                { style: { marginLeft: 5 } },
                '\u8FD17\u5929 ',
                up,
                ' +100'
              )
            )
          )
        )
      );
    }
  }]);

  return _default;
}(Component), _class.displayName = '', _class.propTypes = {}, _class.defaultProps = {}, _temp);

export { _default as default };


var styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0'
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px'
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px'
  },
  desc: {
    fontSize: '12px'
  },
  down: {
    width: '6px',
    height: '9px'
  },
  up: {
    width: '6px',
    height: '9px'
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px'
  }
};