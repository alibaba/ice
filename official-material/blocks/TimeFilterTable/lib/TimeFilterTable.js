import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Search from '@icedesign/base/lib/search';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Radio from '@icedesign/base/lib/radio';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import DataBinder from '@icedesign/data-binder';
import { enquireScreen } from 'enquire-js';

var RadioGroup = _Radio.Group;
var TimeFilterTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/time-filter-table.json',
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
  _inherits(TimeFilterTable, _Component);

  function TimeFilterTable(props) {
    _classCallCheck(this, TimeFilterTable);

    var _this = _possibleConstructorReturn(this, (TimeFilterTable.__proto__ || _Object$getPrototypeOf(TimeFilterTable)).call(this, props));

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
        params: _this.queryCache
      });
    };

    _this.changePage = function (currentPage) {
      _this.queryCache.page = currentPage;
      _this.fetchData();
    };

    _this.onDateChange = function (date) {
      _this.queryCache.timeRange = date;
      _this.fetchData();
      _this.setState({
        timeRange: date
      });
    };

    _this.onSearch = function (value) {
      _this.queryCache.keywords = value.key;
      _this.fetchData();
    };

    _this.renderOrder = function (value, index) {
      return React.createElement(
        'span',
        null,
        index + 1
      );
    };

    _this.queryCache = {};
    _this.state = {
      timeRange: 'day',
      isMobile: false
    };
    return _this;
  }

  _createClass(TimeFilterTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
      this.queryCache.page = 1;
      this.fetchData();
    }
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;

      return React.createElement(
        'div',
        { className: 'time-filter-table' },
        React.createElement(
          IceContainer,
          { style: styles.filterCard },
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              null,
              '\u9009\u62E9\u6D3B\u52A8\u65E5\u671F\u8303\u56F4\uFF1A'
            ),
            React.createElement(RadioGroup, {
              value: this.state.timeRange,
              dataSource: [{
                label: '今天',
                value: 'day'
              }, {
                label: '本周',
                value: 'week'
              }, {
                label: '本月',
                value: 'month'
              }],
              onChange: this.onDateChange
            })
          ),
          !this.state.isMobile && React.createElement(
            'div',
            null,
            React.createElement(_Search, {
              style: styles.search,
              placeholder: '\u641C\u7D22',
              searchText: '',
              onSearch: this.onSearch
            })
          )
        ),
        React.createElement(
          IceContainer,
          { style: styles.tableCard },
          React.createElement(
            _Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading,
              hasBorder: false
            },
            React.createElement(_Table.Column, { title: '\u987A\u5E8F', cell: this.renderOrder, width: 45 }),
            React.createElement(_Table.Column, { title: '\u6D3B\u52A8\u540D\u79F0', dataIndex: 'title', width: 85 }),
            React.createElement(_Table.Column, { title: '\u5907\u6CE8', dataIndex: 'memo', width: 150 }),
            React.createElement(_Table.Column, { title: '\u6709\u6548\u65F6\u95F4', dataIndex: 'validity', width: 85 }),
            React.createElement(_Table.Column, { title: '\u8D1F\u8D23\u4EBA', dataIndex: 'owner', width: 85 })
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

  return TimeFilterTable;
}(Component), _class2.displayName = 'TimeFilterTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
export { TimeFilterTable as default };


var styles = {
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px'
  },
  tableCard: {
    padding: '10px'
  }
};