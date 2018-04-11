import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import { enquireScreen } from 'enquire-js';

var SimpleTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/simple-table-list.json',
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
  _inherits(SimpleTable, _Component);

  function SimpleTable(props) {
    _classCallCheck(this, SimpleTable);

    var _this = _possibleConstructorReturn(this, (SimpleTable.__proto__ || _Object$getPrototypeOf(SimpleTable)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.fetchData = function (_ref) {
      var page = _ref.page;

      _this.props.updateBindingData('tableData', {
        data: {
          page: page
        }
      });
    };

    _this.renderTitle = function (value, index, record) {
      return React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row'
          }
        },
        React.createElement(
          'div',
          null,
          React.createElement(IceImg, { src: record.cover, width: 48, height: 48 })
        ),
        React.createElement(
          'span',
          {
            style: {
              marginLeft: '10px',
              lineHeight: '20px'
            }
          },
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
        { style: { lineHeight: '28px' } },
        React.createElement(
          'a',
          {
            href: '#',
            style: styles.operation,
            target: '_blank',
            onClick: function onClick() {
              _this.editItem(record);
            }
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
      _this.fetchData({
        page: currentPage
      });
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(SimpleTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
      this.fetchData({
        page: 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;

      return React.createElement(
        'div',
        { className: 'simple-table' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading // eslint-disable-line
              , className: 'basic-table',
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
              onChange: this.changePage,
              type: this.state.isMobile ? 'simple' : 'normal'
            })
          )
        )
      );
    }
  }]);

  return SimpleTable;
}(Component), _class2.displayName = 'SimpleTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
export { SimpleTable as default };


var styles = {
  operation: {
    marginRight: '12px',
    textDecoration: 'none'
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};