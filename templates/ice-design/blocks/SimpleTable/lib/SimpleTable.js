'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

var _img = require('@icedesign/img');

var _img2 = _interopRequireDefault(_img);

var _dataBinder = require('@icedesign/data-binder');

var _dataBinder2 = _interopRequireDefault(_dataBinder);

var _label = require('@icedesign/label');

var _label2 = _interopRequireDefault(_label);

require('./SimpleTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var Pagination = require('@icedesign/base/lib/pagination');

// 详细用法请参见 http://ice.alibaba-inc.com/modules/ice-data-binder
var SimpleTable = (_dec = (0, _dataBinder2.default)({
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

    var _this = _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this, props));

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
          style: {
            display: 'flex',
            flexDirection: 'row'
          }
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_img2.default, { src: record.cover, width: 48, height: 48 })
        ),
        _react2.default.createElement(
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
      // todo
      console.log('record', record);
    };

    _this.renderOperations = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        { className: 'simple-table-operation', style: { lineHeight: '28px' } },
        _react2.default.createElement(
          'a',
          {
            href: '#',
            target: '_blank',
            onClick: function onClick() {
              _this.editItem(record);
            }
          },
          '\u89E3\u51B3'
        ),
        _react2.default.createElement(
          'a',
          { href: '#', target: '_blank' },
          '\u8BE6\u60C5'
        ),
        _react2.default.createElement(
          'a',
          { href: '#', target: '_blank' },
          '\u5206\u7C7B'
        )
      );
    };

    _this.renderStatus = function (value) {
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

  _createClass(SimpleTable, [{
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

      return _react2.default.createElement(
        'div',
        { className: 'simple-table' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            Table,
            {
              dataSource: tableData.list,
              isLoading: tableData.__loading // eslint-disable-line
              , className: 'basic-table',
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
            { style: styles.paginationWrapper },
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

  return SimpleTable;
}(_react.Component), _class2.displayName = 'SimpleTable', _class2.propTypes = {}, _class2.defaultProps = {}, _temp)) || _class);
exports.default = SimpleTable;


var styles = {
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px'
  }
};
module.exports = exports['default'];