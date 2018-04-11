import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Icon from '@icedesign/base/lib/icon';
import _Step from '@icedesign/base/lib/step';
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
import { enquireScreen } from 'enquire-js';

var dataSource = function dataSource() {
  return [{
    condition: '校验条件',
    validate: true,
    url: 'https://img.alicdn.com/tps/TB18NwoNFXXXXXoXXXXXXXXXXXX-132-132.png',
    operation: '查看',
    description: '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案'
  }, {
    condition: '校验条件',
    validate: false,
    url: 'https://img.alicdn.com/tps/TB1VyMkNFXXXXc8XXXXXXXXXXXX-134-134.png',
    operation: '解决方式链接',
    description: '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案'
  }, {
    condition: '身份认证',
    validate: true,
    url: 'https://img.alicdn.com/tps/TB1QCMfNFXXXXaOXpXXXXXXXXXX-136-136.png',
    operation: '查看',
    description: '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案'
  }, {
    condition: '非卖家',
    validate: false,
    url: 'https://img.alicdn.com/tps/TB1mGnSNFXXXXbMaXXXXXXXXXXX-134-136.png',
    operation: '解决方式链接',
    description: '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案'
  }, {
    condition: '18岁以上',
    validate: false,
    url: 'https://img.alicdn.com/tps/TB1xwQiNFXXXXcfXXXXXXXXXXXX-136-134.png',
    operation: '解决方式链接',
    description: '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案'
  }];
};

var Row = _Grid.Row,
    Col = _Grid.Col;
var ApplicationProgress = (_temp = _class = function (_Component) {
  _inherits(ApplicationProgress, _Component);

  function ApplicationProgress(props) {
    _classCallCheck(this, ApplicationProgress);

    var _this = _possibleConstructorReturn(this, (ApplicationProgress.__proto__ || _Object$getPrototypeOf(ApplicationProgress)).call(this, props));

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

  _createClass(ApplicationProgress, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var data = dataSource();
      var isMobile = this.state.isMobile;

      return React.createElement(
        'div',
        { className: 'application-progress' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Step,
            { current: 0, type: isMobile ? 'dot' : 'circle' },
            React.createElement(_Step.Item, { title: '\u68C0\u6D4B\u8D26\u53F7' }),
            React.createElement(_Step.Item, { title: '\u9009\u62E9\u5165\u4F4F\u7C7B\u578B' }),
            React.createElement(_Step.Item, { title: '\u586B\u5199\u8BE6\u7EC6\u8D44\u6599' }),
            React.createElement(_Step.Item, { title: '\u5B8C\u6210' })
          ),
          React.createElement(
            'div',
            null,
            data.map(function (item, index) {
              return React.createElement(
                'div',
                { style: styles.row, key: index },
                React.createElement(
                  Row,
                  { wrap: true },
                  React.createElement(
                    Col,
                    { xxs: '24', s: '4' },
                    React.createElement(
                      'div',
                      { style: styles.imageWrap },
                      React.createElement('img', {
                        style: styles.image,
                        src: item.url,
                        alt: 'condition'
                      }),
                      React.createElement('br', null),
                      React.createElement(
                        'span',
                        null,
                        item.condition
                      )
                    )
                  ),
                  React.createElement(
                    Col,
                    {
                      xxs: '24',
                      s: '16',
                      style: _extends({}, styles.itemBody, isMobile && styles.mobileContentCenter)
                    },
                    React.createElement(
                      'span',
                      {
                        style: item.validate ? styles.itemStatusSuccess : styles.itemStatusFail
                      },
                      React.createElement(_Icon, { type: item.validate ? 'success' : 'error' }),
                      React.createElement(
                        'span',
                        { style: styles.itemStatusText },
                        item.validate ? '符合文案' : '不符合文案'
                      )
                    ),
                    React.createElement(
                      'div',
                      {
                        style: _extends({}, styles.itemDescription, isMobile && styles.removeContentWidth)
                      },
                      item.description
                    )
                  ),
                  React.createElement(
                    Col,
                    { xxs: '24', s: '4' },
                    React.createElement(
                      'div',
                      { style: styles.operationWrap },
                      React.createElement(
                        'a',
                        { href: item.url, target: '_blank' },
                        item.operation
                      )
                    )
                  )
                )
              );
            })
          ),
          React.createElement(
            'div',
            { style: styles.itemFooter },
            React.createElement(
              'p',
              null,
              '\u4EB2\uFF0C\u60A8\u9700\u8981\u901A\u8FC7\u5168\u90E8\u6821\u9A8C\u6761\u4EF6\uFF0C\u624D\u53EF\u4EE5\u5F00\u901A\u8D26\u53F7\uFF01'
            ),
            React.createElement(
              _Button,
              { style: styles.nextBtn, size: 'large', disabled: true },
              '\u4E0B\u4E00\u6B65'
            )
          )
        )
      );
    }
  }]);

  return ApplicationProgress;
}(Component), _class.displayName = 'ApplicationProgress', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ApplicationProgress as default };


var styles = {
  row: {
    backgroundColor: '#f9f9f9',
    marginTop: '32px',
    padding: '20px 40px'
  },
  imageWrap: {
    textAlign: 'center'
  },
  image: {
    width: '64px',
    height: '64px',
    borderRadius: '50',
    marginBottom: '12px'
  },
  itemBody: {
    padding: '10px 50px 0'
  },
  itemDescription: {
    color: '#666',
    marginTop: '20px',
    maxWidth: '309px'
  },
  operationWrap: {
    marginTop: '40px',
    textAlign: 'center'
  },
  itemFooter: {
    textAlign: 'center',
    color: '#666',
    marginTop: '40px'
  },
  nextBtn: {
    marginTop: '40px'
  },
  itemStatusSuccess: {
    color: '#1be25c'
  },
  itemStatusFail: {
    color: '#f33',
    fontSize: '16px'
  },
  itemStatusText: {
    marginLeft: '10px'
  },
  mobileContentCenter: {
    textAlign: 'center',
    padding: '20px 0 0 0'
  },
  removeContentWidth: {
    maxWidth: 'none'
  }
};