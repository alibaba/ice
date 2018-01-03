'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./ProgressTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var Progress = require('@icedesign/base/lib/progress');

var Pagination = require('@icedesign/base/lib/pagination');

var getTableData = function getTableData() {
  return Array.from({ length: 10 }).map(function (item, index) {
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

    var _this = _possibleConstructorReturn(this, (ProgressTable.__proto__ || Object.getPrototypeOf(ProgressTable)).call(this, props));

    _this.renderCellProgress = function (value) {
      return _react2.default.createElement(Progress, { showInfo: false, percent: parseInt(value, 10) });
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
      return _react2.default.createElement(
        'div',
        { className: 'progress-table' },
        _react2.default.createElement(
          _card2.default,
          {
            style: {
              margin: '20px'
            },
            className: 'tab-card',
            title: '\u672C\u6708\u6700\u6D3B\u8DC3\u91D1\u4E3B'
          },
          _react2.default.createElement(
            Table,
            {
              hasBorder: true,
              getRowClassName: function getRowClassName(record, index) {
                return 'progress-table-tr progress-table-tr' + index;
              },
              dataSource: this.state.dataSource
            },
            _react2.default.createElement(Table.Column, { title: '\u5E97\u94FA\u540D\u79F0', dataIndex: 'name' }),
            _react2.default.createElement(Table.Column, { title: '\u6210\u4EA4\u91D1\u989D', dataIndex: 'total' }),
            _react2.default.createElement(Table.Column, { title: '\u6210\u4EA4\u5355\u6570', dataIndex: 'count' }),
            _react2.default.createElement(Table.Column, {
              title: '',
              dataIndex: 'progress',
              cell: this.renderCellProgress
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.paginationWrapper },
            _react2.default.createElement(Pagination, {
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
}(_react.Component), _class.displayName = 'ProgressTable', _temp);
exports.default = ProgressTable;


var styles = {
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse'
  }
};
module.exports = exports['default'];