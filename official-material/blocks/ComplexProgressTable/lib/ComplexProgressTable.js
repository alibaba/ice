import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Progress from '@icedesign/base/lib/progress';
import _Button from '@icedesign/base/lib/button';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import DataBinder from '@icedesign/data-binder';
import EditDialog from './EditDialog';

var ComplexProgressTable = (_dec = DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/complex-progress-table.json',
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
  updateRow: {
    url: '/your-update-api.json'
  }
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(ComplexProgressTable, _Component);

  function ComplexProgressTable(props) {
    _classCallCheck(this, ComplexProgressTable);

    // 缓存 table 的请求参数
    var _this = _possibleConstructorReturn(this, (ComplexProgressTable.__proto__ || _Object$getPrototypeOf(ComplexProgressTable)).call(this, props));

    _this.fetchData = function () {
      _this.props.updateBindingData('tableData', {
        data: _this.queryCache
      });
    };

    _this.changePage = function (currentPage) {
      _this.queryCache.page = currentPage;

      _this.fetchData();
    };

    _this.renderTitle = function (value, index, record) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: styles.title },
          record.title
        ),
        React.createElement(
          'div',
          { style: styles.subTitle },
          '\u521B\u5EFA\u65F6\u95F4 ',
          record.createTime
        )
      );
    };

    _this.editItem = function (index, record) {
      EditDialog.show({
        onClose: function onClose() {
          EditDialog.hide();
        },
        onCancel: function onCancel() {
          EditDialog.hide();
        },
        onOk: function onOk(value) {
          // TODO: 更新接口，并重新获取数据
          // this.props.updateBindingData('updateRow', {
          //   method: 'post',
          //   data: value
          // }, () => {
          //   this.fetchData();
          // });
          console.log('value', value);
          EditDialog.hide();
        },
        value: record
      });
    };

    _this.renderOperations = function (value, index, record) {
      return React.createElement(
        'div',
        { style: styles.operations },
        React.createElement(
          _Button,
          {
            style: styles.operationButton,
            onClick: function onClick() {
              return _this.editItem(index, record);
            },
            shape: 'text'
          },
          '\u7F16\u8F91'
        ),
        React.createElement(
          _Button,
          { style: styles.operationButton, shape: 'text' },
          '\u5220\u9664'
        )
      );
    };

    _this.renderProgress = function (value) {
      return React.createElement(_Progress, { percent: value });
    };

    _this.queryCache = {};
    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(ComplexProgressTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.queryCache.page = 1;
      this.fetchData();
    }
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.props.bindingData.tableData;

      return React.createElement(
        'div',
        { className: 'complex-progress-table' },
        React.createElement(
          IceContainer,
          { style: styles.tableCard },
          React.createElement(
            _Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading /* eslint no-underscore-dangle: "off" */
              , className: 'basic-table',
              style: styles.basicTable,
              hasBorder: false
            },
            React.createElement(_Table.Column, {
              title: '\u95EE\u9898\u63CF\u8FF0',
              cell: this.renderTitle,
              width: 320
            }),
            React.createElement(_Table.Column, {
              title: '\u5B8C\u6210\u8FDB\u5EA6',
              dataIndex: 'progress',
              width: 230,
              cell: this.renderProgress
            }),
            React.createElement(_Table.Column, {
              title: '\u4F18\u5148\u7EA7',
              dataIndex: 'priority',
              width: 60,
              style: styles.priority
            }),
            React.createElement(_Table.Column, {
              title: '\u64CD\u4F5C',
              width: 100,
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
              onChange: this.changePage
            })
          )
        )
      );
    }
  }]);

  return ComplexProgressTable;
}(Component), _class2.displayName = 'ComplexProgressTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
export { ComplexProgressTable as default };


var styles = {
  tableCard: {
    padding: '10px'
  },
  subTitle: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#999999'
  },
  operationButton: {
    marginRight: '10px'
  },
  priority: {
    width: '70px',
    textAlign: 'center'
  },
  operations: {
    lineHeight: '28px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};