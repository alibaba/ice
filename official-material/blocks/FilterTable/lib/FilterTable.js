import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
import FilterForm from './Filter';

var EnhanceTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/filter-table-list.json',
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

    // 请求参数缓存
    var _this = _possibleConstructorReturn(this, (EnhanceTable.__proto__ || _Object$getPrototypeOf(EnhanceTable)).call(this, props));

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
          className: 'filter-table-operation',
          style: styles.filterTableOperation
        },
        React.createElement(
          'a',
          {
            href: '#',
            style: styles.operationItem,
            target: '_blank',
            onClick: _this.editItem.bind(_this, record)
          },
          '\u89E3\u51B3'
        ),
        React.createElement(
          'a',
          { href: '#', style: styles.operationItem, target: '_blank' },
          '\u8BE6\u60C5'
        ),
        React.createElement(
          'a',
          { href: '#', style: styles.operationItem, target: '_blank' },
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

    _this.filterFormChange = function (value) {
      _this.setState({
        filterFormValue: value
      });
    };

    _this.filterTable = function () {
      // 合并参数，请求数据
      _this.queryCache = _extends({}, _this.queryCache, _this.state.filterFormValue);
      _this.fetchData();
    };

    _this.resetFilter = function () {
      _this.setState({
        filterFormValue: {}
      });
    };

    _this.queryCache = {};
    _this.state = {
      filterFormValue: {}
    };
    return _this;
  }

  _createClass(EnhanceTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.queryCache.page = 1;
      this.fetchData();
    }
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;
      var filterFormValue = this.state.filterFormValue;


      return React.createElement(
        'div',
        { className: 'filter-table' },
        React.createElement(
          IceContainer,
          { title: '\u5185\u5BB9\u7B5B\u9009' },
          React.createElement(FilterForm, {
            value: filterFormValue,
            onChange: this.filterFormChange,
            onSubmit: this.filterTable,
            onReset: this.resetFilter
          })
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
            { style: styles.paginationWrapper },
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

  return EnhanceTable;
}(Component), _class2.displayName = 'EnhanceTable', _class2.defaultProps = {}, _temp)) || _class);
export { EnhanceTable as default };


var styles = {
  filterTableOperation: {
    lineHeight: '28px'
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px'
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};