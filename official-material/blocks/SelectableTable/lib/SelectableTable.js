import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Button from '@icedesign/base/lib/button';
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

var getMockData = function getMockData() {
  var result = [];
  for (var i = 0; i < 10; i++) {
    result.push({
      id: 100306660940 + i,
      title: {
        name: 'Quotation for 1PCS Nano ' + (3 + i) + '.0 controller compatible'
      },
      type: 'demo示例',
      template: '参数字典列表',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i
    });
  }
  return result;
};

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

var SelectableTable = (_temp = _class = function (_Component) {
  _inherits(SelectableTable, _Component);

  function SelectableTable(props) {
    _classCallCheck(this, SelectableTable);

    // 表格可以勾选配置项
    var _this = _possibleConstructorReturn(this, (SelectableTable.__proto__ || _Object$getPrototypeOf(SelectableTable)).call(this, props));

    _this.clearSelectedKeys = function () {
      _this.setState({
        selectedRowKeys: []
      });
    };

    _this.deleteSelectedKeys = function () {
      var selectedRowKeys = _this.state.selectedRowKeys;

      console.log('delete keys', selectedRowKeys);
    };

    _this.deleteItem = function (record) {
      var id = record.id;

      console.log('delete item', id);
    };

    _this.renderOperator = function (value, index, record) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          null,
          '\u7F16\u8F91'
        ),
        React.createElement(
          'a',
          {
            style: styles.removeBtn,
            onClick: _this.deleteItem.bind(_this, record)
          },
          '\u5220\u9664'
        )
      );
    };

    _this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: function onChange(ids) {
        console.log('ids', ids);
        _this.setState({
          selectedRowKeys: ids
        });
      },
      // 全选表格时触发的回调
      onSelectAll: function onSelectAll(selected, records) {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: function getProps(record) {
        return {
          disabled: record.id === 100306660941
        };
      }
    };

    _this.state = {
      selectedRowKeys: [],
      dataSource: getMockData()
    };
    return _this;
  }

  _createClass(SelectableTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'selectable-table', style: styles.selectableTable },
        React.createElement(
          IceContainer,
          { style: styles.IceContainer },
          React.createElement(
            'div',
            null,
            React.createElement(
              _Button,
              { size: 'small', style: styles.batchBtn },
              React.createElement(_Icon, { type: 'add' }),
              '\u589E\u52A0'
            ),
            React.createElement(
              _Button,
              {
                onClick: this.deleteSelectedKeys,
                size: 'small',
                style: styles.batchBtn,
                disabled: !this.state.selectedRowKeys.length
              },
              React.createElement(_Icon, { type: 'ashbin' }),
              '\u5220\u9664'
            ),
            React.createElement(
              _Button,
              {
                onClick: this.clearSelectedKeys,
                size: 'small',
                style: styles.batchBtn
              },
              React.createElement(_Icon, { type: 'close' }),
              '\u6E05\u7A7A\u9009\u4E2D'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { href: '/', download: true },
              React.createElement(_Icon, { size: 'small', type: 'download' }),
              ' \u5BFC\u51FA\u8868\u683C\u6570\u636E\u5230 .csv \u6587\u4EF6'
            )
          )
        ),
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Table,
            {
              dataSource: this.state.dataSource,
              isLoading: this.state.isLoading,
              rowSelection: _extends({}, this.rowSelection, {
                selectedRowKeys: this.state.selectedRowKeys
              })
            },
            React.createElement(_Table.Column, { title: '\u7F16\u7801', dataIndex: 'id', width: 120 }),
            React.createElement(_Table.Column, { title: '\u540D\u79F0', dataIndex: 'title.name', width: 350 }),
            React.createElement(_Table.Column, { title: '\u7C7B\u578B', dataIndex: 'type', width: 160 }),
            React.createElement(_Table.Column, { title: '\u6A21\u677F', dataIndex: 'template', width: 160 }),
            React.createElement(_Table.Column, { title: '\u53D1\u5E03\u72B6\u6001', dataIndex: 'status', width: 120 }),
            React.createElement(_Table.Column, { title: '\u8BC4\u5206', dataIndex: 'rate', width: 120 }),
            React.createElement(_Table.Column, { title: '\u64CD\u4F5C\u8005', dataIndex: 'publisher', width: 120 }),
            React.createElement(_Table.Column, { title: '\u4FEE\u6539\u65F6\u95F4', dataIndex: 'time', width: 120 }),
            React.createElement(_Table.Column, {
              title: '\u64CD\u4F5C',
              cell: this.renderOperator,
              lock: 'right',
              width: 120
            })
          ),
          React.createElement(
            'div',
            { style: styles.pagination },
            React.createElement(_Pagination, { onChange: this.change })
          )
        )
      );
    }
  }]);

  return SelectableTable;
}(Component), _class.displayName = 'SelectableTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SelectableTable as default };


var styles = {
  batchBtn: {
    marginRight: '10px'
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
  removeBtn: {
    marginLeft: 10
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};