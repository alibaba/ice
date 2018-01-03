'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./SelectableTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var Button = require('@icedesign/base/lib/button');

var Icon = require('@icedesign/base/lib/icon');

var Pagination = require('@icedesign/base/lib/pagination');

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
    var _this = _possibleConstructorReturn(this, (SelectableTable.__proto__ || Object.getPrototypeOf(SelectableTable)).call(this, props));

    _this.clearSelectedKeys = function () {
      _this.setState({
        selectedRowKeys: []
      });
    };

    _this.addMoreItem = function () {
      // todo add some item
    };

    _this.deleteSelectedKeys = function () {
      var selectedRowKeys = _this.state.selectedRowKeys;
      // todo delete selectedRowKeys

      console.log('delete keys', selectedRowKeys);
    };

    _this.deleteItem = function (record) {
      // todo remove this record
      var id = record.id;

      console.log('delete item', id);
    };

    _this.renderOperator = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { href: 'javascript: void(0);' },
          '\u7F16\u8F91'
        ),
        _react2.default.createElement(
          'a',
          {
            style: styles.todo0,
            onClick: _this.deleteItem.bind(_this, record),
            href: 'javascript: void(0);'
          },
          '\u5220\u9664'
        )
      );
    };

    _this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: function onChange(ids, records) {
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
      return _react2.default.createElement(
        'div',
        { className: 'selectable-table', style: styles.selectableTable },
        _react2.default.createElement(
          _card2.default,
          {
            style: styles.todo1
          },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              Button,
              {
                onClick: this.addMoreItem,
                size: 'small',
                className: 'batch-btn',
                style: styles.batchBtn
              },
              _react2.default.createElement(Icon, { type: 'add' }),
              '\u589E\u52A0'
            ),
            _react2.default.createElement(
              Button,
              {
                onClick: this.deleteSelectedKeys,
                size: 'small',
                className: 'batch-btn',
                style: styles.batchBtn,
                disabled: !this.state.selectedRowKeys.length
              },
              _react2.default.createElement(Icon, { type: 'ashbin' }),
              '\u5220\u9664'
            ),
            _react2.default.createElement(
              Button,
              {
                onClick: this.clearSelectedKeys,
                size: 'small',
                className: 'batch-btn',
                style: styles.batchBtn
              },
              _react2.default.createElement(Icon, { type: 'close' }),
              '\u6E05\u7A7A\u9009\u4E2D'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'a',
              { href: '/', download: true },
              _react2.default.createElement(Icon, { size: 'small', type: 'download' }),
              ' \u5BFC\u51FA\u8868\u683C\u6570\u636E\u5230 .csv \u6587\u4EF6'
            )
          )
        ),
        _react2.default.createElement(
          _card2.default,
          { style: styles.todo2 },
          _react2.default.createElement(
            Table,
            {
              dataSource: this.state.dataSource,
              isLoading: this.state.isLoading,
              rowSelection: _extends({}, this.rowSelection, {
                selectedRowKeys: this.state.selectedRowKeys
              })
            },
            _react2.default.createElement(Table.Column, { title: '\u7F16\u7801', dataIndex: 'id', lock: true, width: 120 }),
            _react2.default.createElement(Table.Column, { title: '\u540D\u79F0', dataIndex: 'title.name', width: 350 }),
            _react2.default.createElement(Table.Column, { title: '\u7C7B\u578B', dataIndex: 'type', width: 160 }),
            _react2.default.createElement(Table.Column, { title: '\u6A21\u677F', dataIndex: 'template', width: 160 }),
            _react2.default.createElement(Table.Column, { title: '\u53D1\u5E03\u72B6\u6001', dataIndex: 'status', width: 120 }),
            _react2.default.createElement(Table.Column, { title: '\u8BC4\u5206', dataIndex: 'rate', width: 120 }),
            _react2.default.createElement(Table.Column, { title: '\u64CD\u4F5C\u8005', dataIndex: 'publisher', width: 120 }),
            _react2.default.createElement(Table.Column, { title: '\u4FEE\u6539\u65F6\u95F4', dataIndex: 'time', width: 120 }),
            _react2.default.createElement(Table.Column, {
              title: '\u64CD\u4F5C',
              cell: this.renderOperator,
              lock: 'right',
              width: 120
            })
          ),
          _react2.default.createElement(
            'div',
            {
              style: styles.todo3
            },
            _react2.default.createElement(Pagination, { onChange: this.change })
          )
        )
      );
    }
  }]);

  return SelectableTable;
}(_react.Component), _class.displayName = 'SelectableTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SelectableTable;


var styles = { selectableTable: {}, batchBtn: { marginRight: '10px' }, todo0: { marginLeft: 10 }, todo1: { marginBottom: '20px', minHeight: 'auto', display: 'flex', justifyContent: 'space-between' }, todo2: { width: '1026px' }, todo3: { textAlign: 'right', paddingTop: '26px' } };
module.exports = exports['default'];