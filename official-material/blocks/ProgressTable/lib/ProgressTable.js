import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Pagination from '@icedesign/base/lib/pagination';
import _Table from '@icedesign/base/lib/table';
import _Progress from '@icedesign/base/lib/progress';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Array$from from 'babel-runtime/core-js/array/from';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-mixed-operators:0 */
import React, { Component } from 'react';

import IceContainer from '@icedesign/container';

var getTableData = function getTableData() {
  return _Array$from({ length: 10 }).map(function (item, index) {
    return {
      name: 'A旗舰店',
      total: Math.ceil(Math.random() * 1000000),
      count: 300 - index * 10,
      progress: Math.ceil(Math.random() * 100)
    };
  });
};

var ProgressTable = (_temp = _class = function (_Component) {
  _inherits(ProgressTable, _Component);

  function ProgressTable(props) {
    _classCallCheck(this, ProgressTable);

    var _this = _possibleConstructorReturn(this, (ProgressTable.__proto__ || _Object$getPrototypeOf(ProgressTable)).call(this, props));

    _this.renderCellProgress = function (value) {
      return React.createElement(_Progress, { showInfo: false, percent: parseInt(value, 10) });
    };

    _this.onPageChange = function (pageNo) {
      _this.setState({
        current: pageNo
      });
    };

    _this.state = {
      dataSource: getTableData(),
      current: 1
    };
    return _this;
  }

  _createClass(ProgressTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'progress-table' },
        React.createElement(
          IceContainer,
          { className: 'tab-card', title: '\u672C\u6708\u6700\u6D3B\u8DC3\u91D1\u4E3B' },
          React.createElement(
            _Table,
            {
              getRowClassName: function getRowClassName(record, index) {
                return 'progress-table-tr progress-table-tr' + index;
              },
              dataSource: this.state.dataSource
            },
            React.createElement(_Table.Column, { title: '\u5E97\u94FA\u540D\u79F0', dataIndex: 'name', width: 200 }),
            React.createElement(_Table.Column, { title: '\u6210\u4EA4\u91D1\u989D', dataIndex: 'total', width: 200 }),
            React.createElement(_Table.Column, { title: '\u6210\u4EA4\u5355\u6570', dataIndex: 'count', width: 100 }),
            React.createElement(_Table.Column, {
              title: '',
              dataIndex: 'progress',
              cell: this.renderCellProgress,
              width: 200
            })
          ),
          React.createElement(
            'div',
            { style: styles.paginationWrapper },
            React.createElement(_Pagination, {
              current: this.state.current,
              onChange: this.onPageChange,
              shape: 'arrow-only'
            })
          )
        )
      );
    }
  }]);

  return ProgressTable;
}(Component), _class.displayName = 'ProgressTable', _temp);
export { ProgressTable as default };


var styles = {
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse'
  }
};