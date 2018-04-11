import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Icon from '@icedesign/base/lib/icon';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import EditorInfoDialog from './EditorInfoDialog';

var OperationTable = (_dec = DataBinder({
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

    var _this = _possibleConstructorReturn(this, (OperationTable.__proto__ || _Object$getPrototypeOf(OperationTable)).call(this, props));

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
        { style: styles.titleCol },
        React.createElement(
          'div',
          null,
          React.createElement(IceImg, { src: record.cover, width: 48, height: 48 })
        ),
        React.createElement(
          'span',
          { style: styles.titleText },
          record.title
        )
      );
    };

    _this.editItem = function (record, e) {
      e.preventDefault();
      EditorInfoDialog.show({
        value: record,
        onOk: function onOk(value) {
          // 更新数据
          _this.props.updateBindingData('updateTableData', {
            params: {
              // 复杂数据结构需要 JSON stringify
              newItem: _JSON$stringify(value)
            }
          }, function () {
            // 更新完成之后，可以重新刷新列表接口
            _this.props.updateBindingData('tableData', {
              data: {
                page: 1
              }
            });
            EditorInfoDialog.hide();
          });
        },
        onClose: function onClose() {
          EditorInfoDialog.hide();
        },
        onCancel: function onCancel() {
          EditorInfoDialog.hide();
        }
      });
    };

    _this.renderOperations = function (value, index, record) {
      return React.createElement(
        'div',
        { className: 'operation-table-operation', style: styles.operationTable },
        React.createElement(
          'span',
          {
            onClick: _this.editItem.bind(_this, record),
            title: '\u7F16\u8F91',
            style: styles.operBtn
          },
          React.createElement(_Icon, { size: 'xs', type: 'edit' })
        ),
        React.createElement(
          'span',
          { title: '\u5220\u9664', style: styles.operBtn },
          React.createElement(_Icon, { size: 'xs', type: 'close' })
        ),
        React.createElement(
          'span',
          { title: '\u6536\u85CF', style: styles.operBtn },
          React.createElement(_Icon, { size: 'xs', type: 'favorites-filling' })
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

    _this.state = {};
    return _this;
  }

  _createClass(OperationTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
        { className: 'operation-table' },
        React.createElement(
          IceContainer,
          { style: styles.cardContainer },
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
            { style: styles.paginationContainer },
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

  return OperationTable;
}(Component), _class2.displayName = 'OperationTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
export { OperationTable as default };


var styles = {
  cardContainer: {
    padding: '10px 10px 20px 10px'
  },
  titleCol: {
    display: 'flex',
    flexDirection: 'row'
  },
  titleText: {
    marginLeft: '10px',
    lineHeight: '20px'
  },
  operBtn: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    color: '#929292',
    background: '#f2f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '24px',
    marginRight: '6px'
  },
  paginationContainer: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};