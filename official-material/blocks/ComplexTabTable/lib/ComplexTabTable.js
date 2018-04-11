import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Tab from '@icedesign/base/lib/tab';
import _Search from '@icedesign/base/lib/search';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import { enquireScreen } from 'enquire-js';
import SubCategoryItem from './SubCategoryItem';
import './ComplexTabTable.scss';

var ComplexTabTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/complex-tab-table-list.json',
    params: {
      page: 1
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1
    }
  }
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(ComplexTabTable, _Component);

  function ComplexTabTable(props) {
    _classCallCheck(this, ComplexTabTable);

    var _this = _possibleConstructorReturn(this, (ComplexTabTable.__proto__ || _Object$getPrototypeOf(ComplexTabTable)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.fetchData = function () {
      _this.props.updateBindingData('tableData', {
        data: _this.queryCache
      });
    };

    _this.renderTitle = function (value, index, record) {
      return React.createElement(
        'div',
        { style: styles.titleWrapper },
        React.createElement(
          'div',
          null,
          React.createElement(IceImg, { src: record.cover, width: 48, height: 48 })
        ),
        React.createElement(
          'span',
          { style: styles.title },
          record.title
        )
      );
    };

    _this.editItem = function (record, e) {
      e.preventDefault();
      // TODO: record 为该行所对应的数据，可自定义操作行为
    };

    _this.renderOperations = function (value, index, record) {
      return React.createElement(
        'div',
        { style: styles.complexTabTableOperation },
        React.createElement(
          'a',
          {
            href: '#',
            style: styles.operation,
            target: '_blank',
            onClick: _this.editItem.bind(_this, record)
          },
          '\u89E3\u51B3'
        ),
        React.createElement(
          'a',
          { href: '#', style: styles.operation, target: '_blank' },
          '\u8BE6\u60C5'
        ),
        React.createElement(
          'a',
          { href: '#', style: styles.operation, target: '_blank' },
          '\u5206\u7C7B'
        )
      );
    };

    _this.renderStatus = function (value) {
      return React.createElement(
        IceLabel,
        { inverse: false, status: 'default' },
        value
      );
    };

    _this.changePage = function (currentPage) {
      _this.queryCache.page = currentPage;

      _this.fetchData();
    };

    _this.onTabChange = function (tabKey) {
      var firstTabCatId = _this.state.tabList.find(function (item) {
        return item.type === tabKey;
      }).subCategories[0].id;

      _this.setState({
        currentTab: tabKey,
        currentCategory: firstTabCatId
      });
      _this.queryCache.catId = firstTabCatId;
      _this.fetchData();
    };

    _this.onSubCategoryClick = function (catId) {
      _this.setState({
        currentCategory: catId
      });
      _this.queryCache.catId = catId;
      _this.fetchData();
    };

    _this.renderTabBarExtraContent = function () {
      return React.createElement(
        'div',
        { style: styles.tabExtra },
        React.createElement(_Search, {
          style: styles.search,
          type: 'secondary',
          placeholder: '\u641C\u7D22',
          searchText: '',
          onSearch: _this.onSearch
        })
      );
    };

    _this.queryCache = {};
    _this.state = {
      isMobile: false,
      currentTab: 'solved',
      currentCategory: '1',
      tabList: [{
        text: '已解决',
        count: '123',
        type: 'solved',
        subCategories: [{
          text: '申请账号失败',
          id: '1'
        }, {
          text: '粉丝数为0',
          id: '2'
        }, {
          text: '空间不足',
          id: '3'
        }, {
          text: '系统报错',
          id: '4'
        }, {
          text: '网络异常',
          id: '5'
        }, {
          text: '不在范围',
          id: '6'
        }]
      }, {
        text: '待解决',
        count: '10',
        type: 'needFix',
        subCategories: [{
          text: '网络异常',
          id: '21'
        }, {
          text: '空间不足',
          id: '22'
        }]
      }, {
        text: '待验证',
        count: '32',
        type: 'needValidate',
        subCategories: [{
          text: '系统报错',
          id: '34'
        }, {
          text: '网络异常',
          id: '35'
        }, {
          text: '不在范围',
          id: '36'
        }]
      }]
    };
    return _this;
  }

  _createClass(ComplexTabTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
      this.queryCache.page = 1;
      this.fetchData();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tableData = this.props.bindingData.tableData;

      var tabList = this.state.tabList;


      return React.createElement(
        'div',
        { className: 'complex-tab-table' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Tab,
            {
              onChange: this.onTabChange,
              type: 'bar',
              currentTab: this.state.currentTab,
              contentStyle: {
                padding: 0
              },
              tabBarExtraContent: !this.state.isMobile ? this.renderTabBarExtraContent() : null
            },
            tabList && tabList.length > 0 ? tabList.map(function (tab) {
              return React.createElement(
                _Tab.TabPane,
                {
                  key: tab.type,
                  tab: React.createElement(
                    'span',
                    null,
                    tab.text,
                    React.createElement(
                      'span',
                      { style: styles.tabCount },
                      tab.count
                    )
                  )
                },
                tab.subCategories && tab.subCategories.length > 0 ? tab.subCategories.map(function (catItem, index) {
                  return React.createElement(SubCategoryItem, _extends({}, catItem, {
                    isCurrent: catItem.id === _this2.state.currentCategory,
                    onItemClick: _this2.onSubCategoryClick,
                    key: index
                  }));
                }) : null
              );
            }) : null
          )
        ),
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading,
              className: 'basic-table',
              style: styles.basicTable,
              hasBorder: false
            },
            React.createElement(_Table.Column, {
              title: '\u95EE\u9898\u63CF\u8FF0',
              cell: this.renderTitle,
              width: 320
            }),
            React.createElement(_Table.Column, { title: '\u95EE\u9898\u5206\u7C7B', dataIndex: 'type', width: 85 }),
            React.createElement(_Table.Column, {
              title: '\u53D1\u5E03\u65F6\u95F4',
              dataIndex: 'publishTime',
              width: 150
            }),
            React.createElement(_Table.Column, {
              title: '\u72B6\u6001',
              dataIndex: 'publishStatus',
              width: 85,
              cell: this.renderStatus
            }),
            React.createElement(_Table.Column, {
              title: '\u64CD\u4F5C',
              dataIndex: 'operation',
              width: 150,
              cell: this.renderOperations
            })
          ),
          React.createElement(
            'div',
            { style: styles.pagination },
            React.createElement(_Pagination, {
              current: tableData.currentPage,
              pageSize: tableData.pageSize,
              total: tableData.total,
              onChange: this.changePage
            })
          )
        )
      );
    }
  }]);

  return ComplexTabTable;
}(Component), _class2.displayName = 'ComplexTabTable', _class2.defaultProps = {}, _temp)) || _class);
export { ComplexTabTable as default };


var styles = {
  complexTabTableOperation: {
    lineHeight: '28px'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px'
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none'
  },
  tabExtra: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    marginLeft: 10
  },
  tabCount: {
    marginLeft: '5px',
    color: '#3080FE'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};