import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Tab from '@icedesign/base/lib/tab';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';

var BasicTab = (_temp = _class = function (_Component) {
  _inherits(BasicTab, _Component);

  function BasicTab() {
    _classCallCheck(this, BasicTab);

    return _possibleConstructorReturn(this, (BasicTab.__proto__ || _Object$getPrototypeOf(BasicTab)).apply(this, arguments));
  }

  _createClass(BasicTab, [{
    key: 'render',
    value: function render() {
      var tabs = [{ tab: '订阅号概览', key: 'guide' }, { tab: '订阅号推送', key: 'push' }, { tab: '互动消息', key: 'message' }, { tab: '自动回复设置', key: 'autoreply' }];

      return React.createElement(
        'div',
        { className: 'basic-tab' },
        React.createElement(
          IceContainer,
          { style: styles.tabCardStyle },
          React.createElement(
            _Tab,
            { contentStyle: { display: 'none' } },
            tabs.map(function (item) {
              return React.createElement(_Tab.TabPane, { key: item.key, tab: item.tab });
            })
          )
        )
      );
    }
  }]);

  return BasicTab;
}(Component), _class.displayName = 'BasicTab', _temp);
export { BasicTab as default };


var styles = {
  tabCardStyle: {
    padding: 0
  }
};