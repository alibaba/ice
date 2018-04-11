import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Tag from '@icedesign/base/lib/tag';
import _Search from '@icedesign/base/lib/search';
import _DatePicker from '@icedesign/base/lib/date-picker';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Tab from '@icedesign/base/lib/tab';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';

var TabPane = _Tab.TabPane;

// mock data
var tagList = [{
  key: 'all',
  name: '全部商品'
}, {
  key: 'unclassified',
  name: '未分类'
}, {
  key: 'invalid',
  name: '已失效'
}, {
  key: 'haohuo',
  name: '有好货专用'
}, {
  key: 'bimai',
  name: '必买清单'
}];

var CompositeFilter = (_temp = _class = function (_Component) {
  _inherits(CompositeFilter, _Component);

  function CompositeFilter(props) {
    _classCallCheck(this, CompositeFilter);

    var _this = _possibleConstructorReturn(this, (CompositeFilter.__proto__ || _Object$getPrototypeOf(CompositeFilter)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.onTabChange = function (key) {
      console.log('select tab is: ' + key);
    };

    _this.onTagChange = function (key, selected) {
      console.log('Tag: ' + key + ' is ' + (selected ? 'selected' : 'unselected'));
    };

    _this.onDateChange = function (value) {
      console.log(value);
    };

    _this.onSearch = function (value) {
      console.log(value);
    };

    _this.renderTabBarExtraContent = function () {
      return React.createElement(
        'div',
        { style: styles.extraFilter },
        React.createElement(_DatePicker, {
          locale: { datePlaceholder: '发布日期' },
          onChange: _this.onDateChange
        }),
        React.createElement(_Search, {
          placeholder: '\u641C\u7D22',
          searchText: '',
          inputWidth: 150,
          onSearch: _this.onSearch,
          style: styles.search
        })
      );
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(CompositeFilter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'composite-filter' },
        React.createElement(
          IceContainer,
          { style: styles.filterCard },
          React.createElement(
            _Tab,
            {
              type: 'text',
              onChange: this.onTabChange,
              contentStyle: { display: 'none' },
              tabBarExtraContent: !this.state.isMobile ? this.renderTabBarExtraContent() : null
            },
            React.createElement(TabPane, { tab: '\u5168\u90E8', key: 'all' }),
            React.createElement(TabPane, { tab: '\u56FE\u6587', key: 'pic' }),
            React.createElement(TabPane, { tab: '\u5355\u54C1', key: 'item' }),
            React.createElement(TabPane, { tab: '\u5E97\u94FA\u4E0A\u65B0', key: 'new' }),
            React.createElement(TabPane, { tab: '\u77ED\u89C6\u9891', key: 'video' })
          ),
          React.createElement(
            'div',
            { style: styles.tagList },
            tagList.map(function (tag, index) {
              return React.createElement(
                _Tag,
                {
                  shape: 'selectable',
                  type: 'normal',
                  key: index,
                  onChange: _this2.onTagChange.bind(_this2, tag.key)
                },
                tag.name
              );
            })
          )
        )
      );
    }
  }]);

  return CompositeFilter;
}(Component), _class.displayName = 'CompositeFilter', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { CompositeFilter as default };


var styles = {
  filterCard: {
    position: 'relative',
    padding: 10
  },
  tagList: {
    marginTop: '10px'
  },
  extraFilter: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'row'
  },
  search: {
    marginLeft: '12px'
  }
};