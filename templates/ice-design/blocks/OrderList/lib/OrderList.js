'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./OrderList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var OrderList = (_temp = _class = function (_Component) {
  _inherits(OrderList, _Component);

  function OrderList(props) {
    _classCallCheck(this, OrderList);

    var _this = _possibleConstructorReturn(this, (OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call(this, props));

    _this.getTableData = function () {
      _axios2.default.get('/mock/order-list.json').then(function (response) {
        _this.setState({
          tableData: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.renderOrderInfo = function (product) {
      return _react2.default.createElement(
        'div',
        { className: 'order-info', style: styles.orderInfo },
        _react2.default.createElement('img', { src: product[0].avatar, className: 'order-img', style: styles.orderImg }),
        _react2.default.createElement(
          'div',
          { className: 'order-description', style: styles.orderDescription },
          product[0].description
        )
      );
    };

    _this.renderOrderPrice = function (price) {
      return _react2.default.createElement(
        'b',
        null,
        price
      );
    };

    _this.renderOrderNumber = function (record) {
      return _react2.default.createElement(
        'div',
        null,
        record.product[0].title
      );
    };

    _this.getRowClassName = function (record) {
      if (record.status == 0) {
        return 'highlight-row';
      }
    };

    _this.renderOperation = function () {
      return _react2.default.createElement(
        'a',
        { href: '/', className: 'order-detail-link', style: styles.orderDetailLink },
        '\u67E5\u770B'
      );
    };

    _this.handleRowSelection = function (selectedRowKeys, records) {
      console.log('selectedRowKeys:', selectedRowKeys);
      console.log('records:', records);
    };

    _this.state = {
      tableData: []
    };
    return _this;
  }

  _createClass(OrderList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getTableData();
    }

    /**
     * 异步获取数据
     */


    /**
     * 渲染订单信息
     */


    /**
     * 渲染订单价格
     */


    /**
     * 渲染订单单号
     */


    /**
     * 设置每一行的样式名称
     */


    /**
     * 渲染操作行
     */


    /**
     * 选中当前行的回调
     */

  }, {
    key: 'render',
    value: function render() {
      var rowSelection = {
        onChange: this.handleRowSelection,
        mode: 'single'
      };

      var tableData = this.state.tableData;


      return _react2.default.createElement(
        'div',
        { className: 'order-list', style: styles.orderList },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'order-list-head', style: styles.orderListHead },
            '\u8BA2\u5355\u5217\u8868'
          ),
          _react2.default.createElement(
            Table,
            { dataSource: tableData,
              getRowClassName: this.getRowClassName,
              rowSelection: rowSelection
            },
            _react2.default.createElement(Table.GroupHeader, { cell: this.renderOrderNumber }),
            _react2.default.createElement(Table.Column, { cell: this.renderOrderInfo, title: '\u5546\u54C1', dataIndex: 'product' }),
            _react2.default.createElement(Table.Column, { cell: this.renderOrderPrice, title: '\u4EF7\u683C', dataIndex: 'price', width: 120 }),
            _react2.default.createElement(Table.Column, { cell: this.renderOperation, title: '\u64CD\u4F5C', width: 100 })
          )
        )
      );
    }
  }]);

  return OrderList;
}(_react.Component), _class.displayName = 'OrderList', _class.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
}, _class.defaultProps = {}, _temp);
exports.default = OrderList;


var styles = { "orderImg": { "width": "60px", "height": "60px", "float": "left", "marginRight": "10px" }, "orderDetailLink": { "textDecoration": "none" }, "orderList": {}, "orderListHead": { "marginBottom": "20px", "color": "#666" } };
module.exports = exports['default'];