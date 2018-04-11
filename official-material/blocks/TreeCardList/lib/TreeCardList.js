import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Select from '@icedesign/base/lib/select';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import './TreeCardList.scss';

var Option = _Select.Option;


var dataSource = [{ tab: '首页', url: '##', subTitle: '10W' }, { tab: '列表页', url: '##', subTitle: '20W' }, { tab: '详情页', url: '##', subTitle: '30W' }, { tab: '下单页', url: '##', subTitle: '10W' }, { tab: '猜你喜欢', url: '##', subTitle: '40W' }, { tab: '欢迎页面', url: '##', subTitle: '10W' }, { tab: '项目管理页', url: '##', subTitle: '20W' }];

var TreeCardList = (_temp = _class = function (_Component) {
  _inherits(TreeCardList, _Component);

  function TreeCardList(props) {
    _classCallCheck(this, TreeCardList);

    var _this = _possibleConstructorReturn(this, (TreeCardList.__proto__ || _Object$getPrototypeOf(TreeCardList)).call(this, props));

    _this.renderItem = function (item, idx) {
      return React.createElement(
        'a',
        {
          href: item.url,
          className: 'tree-card-item',
          style: styles.treeCardItem,
          key: idx
        },
        React.createElement(
          'span',
          { style: styles.tab },
          item.tab
        ),
        React.createElement(
          'span',
          { style: styles.subTitle },
          item.subTitle
        )
      );
    };

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(TreeCardList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tree-card-list', style: styles.treeCardList },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.firstRow },
            React.createElement(
              'span',
              null,
              '\u7AD9\u70B9\u5217\u8868'
            ),
            React.createElement(
              _Select,
              { size: 'small' },
              React.createElement(
                Option,
                { value: '\u6DD8\u5B9D' },
                '\u6DD8\u5B9D'
              ),
              React.createElement(
                Option,
                { value: '\u652F\u4ED8\u5B9D' },
                '\u652F\u4ED8\u5B9D'
              ),
              React.createElement(
                Option,
                { value: '\u963F\u91CC\u5DF4\u5DF4' },
                '\u963F\u91CC\u5DF4\u5DF4'
              )
            )
          ),
          dataSource.map(this.renderItem)
        )
      );
    }
  }]);

  return TreeCardList;
}(Component), _class.displayName = 'TreeCardList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { TreeCardList as default };


var styles = {
  firstRow: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  treeCardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: '4px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    padding: '0 10px',
    textDecoration: 'none'
  }
};