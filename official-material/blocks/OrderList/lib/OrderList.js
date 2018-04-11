import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import axios from 'axios';

import IceContainer from '@icedesign/container';

var OrderList = (_temp = _class = function (_Component) {
  _inherits(OrderList, _Component);

  function OrderList(props) {
    _classCallCheck(this, OrderList);

    var _this = _possibleConstructorReturn(this, (OrderList.__proto__ || _Object$getPrototypeOf(OrderList)).call(this, props));

    _this.getTableData = function () {
      axios.get('/mock/order-list.json').then(function (response) {
        _this.setState({
          tableData: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.renderOrderInfo = function (product) {
      return React.createElement(
        'div',
        { className: 'order-info', style: styles.orderInfo },
        React.createElement('img', { src: product[0].avatar, style: styles.orderImg, alt: '\u5934\u50CF' }),
        React.createElement(
          'div',
          { className: 'order-description', style: styles.orderDescription },
          product[0].description
        )
      );
    };

    _this.renderOrderPrice = function (price) {
      return React.createElement(
        'b',
        null,
        price
      );
    };

    _this.renderOrderNumber = function (record) {
      return React.createElement(
        'div',
        null,
        record.product[0].title
      );
    };

    _this.getRowClassName = function (record) {
      if (record.status === 0) {
        return 'highlight-row';
      }
    };

    _this.renderOperation = function () {
      return React.createElement(
        'a',
        { href: '/', style: styles.orderDetailLink },
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


      return React.createElement(
        'div',
        { className: 'order-list', style: styles.orderList },
        React.createElement(
          IceContainer,
          { title: '\u8BA2\u5355\u5217\u8868' },
          React.createElement(
            _Table,
            {
              dataSource: tableData,
              getRowClassName: this.getRowClassName,
              rowSelection: rowSelection,
              hasBorder: false
            },
            React.createElement(_Table.GroupHeader, { cell: this.renderOrderNumber }),
            React.createElement(_Table.Column, {
              cell: this.renderOrderInfo,
              title: '\u5546\u54C1',
              dataIndex: 'product',
              width: 400
            }),
            React.createElement(_Table.Column, {
              cell: this.renderOrderPrice,
              title: '\u4EF7\u683C',
              dataIndex: 'price',
              width: 120
            }),
            React.createElement(_Table.Column, {
              cell: this.renderOperation,
              title: '\u64CD\u4F5C',
              width: 100
            })
          )
        )
      );
    }
  }]);

  return OrderList;
}(Component), _class.displayName = 'OrderList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { OrderList as default };


var styles = {
  orderImg: {
    width: '60px',
    height: '60px',
    float: 'left',
    marginRight: '10px'
  },
  orderDetailLink: {
    textDecoration: 'none'
  }
};