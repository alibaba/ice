'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./OperationTable.scss');

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

var _img = require('@icedesign/img');

var _img2 = _interopRequireDefault(_img);

var _dataBinder = require('@icedesign/data-binder');

var _dataBinder2 = _interopRequireDefault(_dataBinder);

var _label = require('@icedesign/label');

var _label2 = _interopRequireDefault(_label);

var _EditorInfoDialog = require('./EditorInfoDialog');

var _EditorInfoDialog2 = _interopRequireDefault(_EditorInfoDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var Pagination = require('@icedesign/base/lib/pagination');

var Button = require('@icedesign/base/lib/button');

var Icon = require('@icedesign/base/lib/icon');

// 详细用法请参见 http://ice.alibaba-inc.com/modules/ice-data-binder
var OperationTable = (_dec = (0, _dataBinder2.default)({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/operation-table-list.json',
    params: {
      page: 1
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1
    }
  },
  updateTableData: {
    url: '/mock/update-table-item.json'
  }
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(OperationTable, _Component);

  function OperationTable(props) {
    _classCallCheck(this, OperationTable);

    var _this = _possibleConstructorReturn(this, (OperationTable.__proto__ || Object.getPrototypeOf(OperationTable)).call(this, props));

    _this.fetchData = function (_ref) {
      var page = _ref.page;

      _this.props.updateBindingData('tableData', {
        data: {
          page: page
        }
      });
    };

    _this.renderTitle = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        {
          style: styles.todo0
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_img2.default, { src: record.cover, width: 48, height: 48 })
        ),
        _react2.default.createElement(
          'span',
          {
            style: styles.todo1
          },
          record.title
        )
      );
    };

    _this.editItem = function (record, e) {
      e.preventDefault();
      _EditorInfoDialog2.default.show({
        value: record,
        onOk: function onOk(value) {
          console.log('value', value);
          // todo send to api
          _this.props.updateBindingData('updateTableData', {
            params: {
              // 复杂数据结构需要 JSON stringify
              newItem: JSON.stringify(value)
            }
          }, function () {
            // 更新完成之后，可以重新刷新列表接口
            _this.props.updateBindingData('tableData', {
              data: {
                page: 1
              }
            });
            _EditorInfoDialog2.default.hide();
          });
        },
        onClose: function onClose() {
          _EditorInfoDialog2.default.hide();
        },
        onCancel: function onCancel() {
          _EditorInfoDialog2.default.hide();
        }
      });
    };

    _this.renderOperations = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        { className: 'operation-table-operation', style: styles.operationTableOperation },
        _react2.default.createElement(
          'span',
          {
            onClick: _this.editItem.bind(_this, record),
            title: '\u7F16\u8F91',
            className: 'operation-table-operation-item',
            style: styles.operationTableOperationItem
          },
          _react2.default.createElement(Icon, { size: 'xs', type: 'edit' })
        ),
        _react2.default.createElement(
          'span',
          { title: '\u5220\u9664', className: 'operation-table-operation-item', style: styles.operationTableOperationItem },
          _react2.default.createElement(Icon, { size: 'xs', type: 'close' })
        ),
        _react2.default.createElement(
          'span',
          { title: '\u6536\u85CF', className: 'operation-table-operation-item', style: styles.operationTableOperationItem },
          _react2.default.createElement(Icon, { size: 'xs', type: 'favorites-filling' })
        )
      );
    };

    _this.renderStatus = function (value, index, record) {
      return _react2.default.createElement(
        _label2.default,
        { inverse: false, status: 'default' },
        value
      );
    };

    _this.changePage = function (currentPage) {
      _this.fetchData({
        page: currentPage
      });
    };

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(OperationTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData({
        page: 1
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;

      return _react2.default.createElement(
        'div',
        { className: 'operation-table', style: styles.operationTable },
        _react2.default.createElement(
          _card2.default,
          { style: styles.todo2 },
          _react2.default.createElement(
            Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading,
              className: 'basic-table',
              style: styles.basicTable,
              hasBorder: false
            },
            _react2.default.createElement(Table.Column, {
              title: '\u95EE\u9898\u63CF\u8FF0',
              cell: this.renderTitle,
              width: 320
            }),
            _react2.default.createElement(Table.Column, { title: '\u95EE\u9898\u5206\u7C7B', dataIndex: 'type', width: 85 }),
            _react2.default.createElement(Table.Column, {
              title: '\u53D1\u5E03\u65F6\u95F4',
              dataIndex: 'publishTime',
              width: 150
            }),
            _react2.default.createElement(Table.Column, {
              title: '\u72B6\u6001',
              dataIndex: 'publishStatus',
              width: 85,
              cell: this.renderStatus
            }),
            _react2.default.createElement(Table.Column, {
              title: '\u64CD\u4F5C',
              dataIndex: 'operation',
              width: 150,
              cell: this.renderOperations
            })
          ),
          _react2.default.createElement(
            'div',
            {
              style: styles.todo3
            },
            _react2.default.createElement(Pagination, {
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

  return OperationTable;
}(_react.Component), _class2.displayName = 'OperationTable', _class2.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class2.defaultProps = {}, _temp)) || _class);
exports.default = OperationTable;


var styles = { operationTableOperation: { 'a {MarginRight': '12px', textDecoration: 'none' }, operationTableOperationItem: { display: 'inline-block', width: '24px', height: '24px', borderRadius: '999px', color: '#929292', background: '#f2f2f2', textAlign: 'center', cursor: 'pointer', lineHeight: '24px', marginRight: '6px', transition: 'all ease 0' }, operationTable: {}, todo0: { display: 'flex', flexDirection: 'row' }, todo1: { marginLeft: '10px', lineHeight: '20px' }, todo2: { padding: '10px 10px 20px 10px' }, todo3: { textAlign: 'right', paddingTop: '26px' } };
module.exports = exports['default'];