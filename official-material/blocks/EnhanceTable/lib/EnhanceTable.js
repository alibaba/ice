import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Search from '@icedesign/base/lib/search';
import _Tab from '@icedesign/base/lib/tab';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import { enquireScreen } from 'enquire-js';

var EnhanceTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/enhance-table-list.json',
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
  _inherits(EnhanceTable, _Component);

  function EnhanceTable(props) {
    _classCallCheck(this, EnhanceTable);

    var _this = _possibleConstructorReturn(this, (EnhanceTable.__proto__ || _Object$getPrototypeOf(EnhanceTable)).call(this, props));

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
        {
          className: 'enhance-table-operation',
          style: styles.enhanceTableOperation
        },
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
      _this.setState({
        activeKey: tabKey
      });
      _this.queryCache.activeKey = tabKey;

      if (tabKey === 'solved') {
        _this.fetchData();
      } else if (tabKey === 'needFix') {
        _this.fetchData();
      } else {
        console.log('\u4F60\u70B9\u51FB\u4E86 ' + tabKey);
      }
    };

    _this.onSearch = function (value) {
      _this.queryCache.keywords = value.key;
      _this.fetchData();
    };

    _this.queryCache = {};
    _this.state = {
      activeKey: 'solved'
    };
    return _this;
  }

  _createClass(EnhanceTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.queryCache.page = 1;
      this.fetchData();
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;

      return React.createElement(
        'div',
        { className: 'enhance-table', style: styles.enhanceTable },
        React.createElement(
          IceContainer,
          { style: styles.card },
          React.createElement(
            'div',
            null,
            React.createElement(
              _Tab,
              {
                onChange: this.onTabChange,
                size: 'small',
                type: 'text',
                activeKey: this.state.activeKey,
                contentStyle: { display: 'none' }
              },
              React.createElement(_Tab.TabPane, {
                key: 'solved',
                tab: React.createElement(
                  'span',
                  null,
                  '\u5DF2\u89E3\u51B3 ',
                  React.createElement(
                    'span',
                    { style: styles.tabCount },
                    '123'
                  )
                )
              }),
              React.createElement(_Tab.TabPane, {
                key: 'needFix',
                tab: React.createElement(
                  'span',
                  null,
                  '\u5F85\u89E3\u51B3 ',
                  React.createElement(
                    'span',
                    { style: styles.tabCount },
                    '10'
                  )
                )
              }),
              React.createElement(_Tab.TabPane, {
                key: 'needValidate',
                tab: React.createElement(
                  'span',
                  null,
                  '\u5F85\u9A8C\u8BC1 ',
                  React.createElement(
                    'span',
                    { style: styles.tabCount },
                    '2'
                  )
                )
              })
            )
          ),
          React.createElement(
            'div',
            { style: styles.extraFilter },
            React.createElement(_Search, {
              style: styles.search,
              type: 'primary',
              inputWidth: 150,
              placeholder: '\u641C\u7D22',
              searchText: '',
              onSearch: this.onSearch
            })
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
              onChange: this.changePage,
              type: this.state.isMobile ? 'simple' : 'normal'
            })
          )
        )
      );
    }
  }]);

  return EnhanceTable;
}(Component), _class2.displayName = 'EnhanceTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
export { EnhanceTable as default };


var styles = {
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px'
  },
  enhanceTableOperation: {
    lineHeight: '28px'
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none'
  },
  card: {
    minHeight: 0,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  tabCount: {
    color: '#3080FE'
  },
  extraFilter: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    marginLeft: 10
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};