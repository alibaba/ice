import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Balloon from '@icedesign/base/lib/balloon';
import _Icon from '@icedesign/base/lib/icon';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var UserInfoCard = (_temp = _class = function (_Component) {
  _inherits(UserInfoCard, _Component);

  function UserInfoCard(props) {
    _classCallCheck(this, UserInfoCard);

    var _this = _possibleConstructorReturn(this, (UserInfoCard.__proto__ || _Object$getPrototypeOf(UserInfoCard)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(UserInfoCard, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          'div',
          { className: 'user-info-card', style: styles.container },
          React.createElement(
            _Balloon,
            {
              trigger: React.createElement(
                'a',
                { style: styles.triggerText },
                '\u5F20\u4E09'
              ),
              closable: false
            },
            React.createElement(
              'div',
              { style: styles.content },
              React.createElement(
                'div',
                { style: styles.head },
                React.createElement('img', {
                  src: 'https://img.alicdn.com/tfs/TB1nf.WjyqAXuNjy1XdXXaYcVXa-245-245.gif',
                  style: styles.avatar,
                  alt: '\u5934\u50CF'
                }),
                React.createElement(
                  'div',
                  { style: styles.baseInfo },
                  React.createElement(
                    'h5',
                    { style: styles.name },
                    '\u5F20\u4E09'
                  ),
                  React.createElement(
                    'p',
                    { style: styles.deptName },
                    '\u9500\u552E\u90E8 - \u5185\u9500\u5E73\u53F0 - \u552E\u540E\u670D\u52A1'
                  )
                )
              ),
              React.createElement(
                'ul',
                { style: styles.body },
                React.createElement(
                  'li',
                  { style: styles.profileItem },
                  React.createElement(_Icon, { type: 'map', size: 'xs', style: styles.itemIcon }),
                  ' \u676D\u5DDE'
                ),
                React.createElement(
                  'li',
                  { style: styles.profileItem },
                  React.createElement(_Icon, { type: 'discount', size: 'xs', style: styles.itemIcon }),
                  '\u9500\u552E\u4E13\u5BB6'
                ),
                React.createElement(
                  'li',
                  { style: styles.profileItem },
                  React.createElement(_Icon, { type: 'phone', size: 'xs', style: styles.itemIcon }),
                  '871066160'
                ),
                React.createElement(
                  'li',
                  { style: styles.profileItem },
                  React.createElement(_Icon, { type: 'mobile-phone', size: 'xs', style: styles.itemIcon }),
                  '13867894321'
                ),
                React.createElement(
                  'li',
                  { style: _extends({}, styles.profileItem, { width: '100%' }) },
                  React.createElement(
                    'a',
                    { href: 'mailto:ice-admin@alibaba-inc.com' },
                    React.createElement(_Icon, { type: 'email', size: 'xs', style: styles.itemIcon }),
                    'ice-admin@alibaba-inc.com'
                  )
                ),
                React.createElement(
                  'li',
                  { style: _extends({}, styles.profileItem, { width: '100%' }) },
                  React.createElement(_Icon, { type: 'account', size: 'xs', style: styles.itemIcon }),
                  '\u4E3B\u7BA1\uFF1A\u674E\u56DB'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UserInfoCard;
}(Component), _class.displayName = 'UserInfoCard', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { UserInfoCard as default };


var styles = {
  container: {
    padding: '20px 0',
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  head: {
    display: 'flex',
    paddingBottom: '10px',
    borderBottom: '1px dotted #eee'
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50px',
    border: '1px solid #eee'
  },
  name: {
    padding: '0 10px',
    margin: 0
  },
  deptName: {
    padding: '0 10px',
    margin: 0,
    fontSize: '12px'
  },
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '10px'
  },
  profileItem: {
    width: '50%',
    lineHeight: '26px'
  },
  itemIcon: {
    color: '#8a9099',
    marginRight: '5px'
  },
  triggerText: {
    color: '#108ee9',
    borderBottom: '1px dashed #108ee9',
    cursor: 'pointer'
  }
};