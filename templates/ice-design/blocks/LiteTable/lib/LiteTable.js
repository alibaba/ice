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

require('./LiteTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var styles = {
  tableCard: { width: 430, padding: 10 },
  liteTable: {},
  todo0: { color: '#5485F7' },
  todo1: { color: '#64D874' },
  todo2: { color: '#999999' },
  todo3: { color: '#FA7070' }
};

var generatorMockStatus = function generatorMockStatus() {
  var random = parseInt(Math.random() * 10, 10);
  if (random < 3) {
    return 'processing';
  } else if (random >= 3 && random < 6) {
    return 'finish';
  } else if (random >= 6 && random < 8) {
    return 'terminated';
  } else if (random >= 8) {
    return 'pass';
  }
};

var generatorData = function generatorData() {
  return Array.from({ length: 10 }).map(function (item, index) {
    return {
      project: '\u8FD9\u91CC\u662F\u5B57\u6570\u4E0D\u80FD\u592A\u957F\u7684\u9879\u76EE\u540D ' + index,
      owner: '\u5F00\u53D1\u8005 ' + index,
      status: generatorMockStatus()
    };
  });
};

var statusComponents = {
  processing: _react2.default.createElement(
    'span',
    { style: styles.todo0 },
    '\u8FDB\u884C\u4E2D'
  ),
  finish: _react2.default.createElement(
    'span',
    { style: styles.todo1 },
    '\u5DF2\u5B8C\u6210'
  ),
  terminated: _react2.default.createElement(
    'span',
    { style: styles.todo2 },
    '\u5DF2\u7EC8\u6B62'
  ),
  pass: _react2.default.createElement(
    'span',
    { style: styles.todo3 },
    '\u672A\u901A\u8FC7'
  )
};

var LiteTable = (_temp = _class = function (_Component) {
  _inherits(LiteTable, _Component);

  function LiteTable(props) {
    _classCallCheck(this, LiteTable);

    var _this = _possibleConstructorReturn(this, (LiteTable.__proto__ || Object.getPrototypeOf(LiteTable)).call(this, props));

    _this.renderStatus = function (value) {
      return statusComponents[value];
    };

    _this.state = {
      tableData: generatorData()
    };
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(LiteTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var tableData = this.state.tableData;

      return _react2.default.createElement(
        'div',
        { className: 'lite-table', style: styles.liteTable },
        _react2.default.createElement(
          _card2.default,
          { style: styles.tableCard },
          _react2.default.createElement(
            Table,
            { dataSource: tableData, hasBorder: false },
            _react2.default.createElement(Table.Column, { title: '\u9879\u76EE\u540D\u79F0', dataIndex: 'project', width: 160 }),
            _react2.default.createElement(Table.Column, { title: '\u521B\u5EFA\u8005', dataIndex: 'owner', width: 65 }),
            _react2.default.createElement(Table.Column, {
              title: '\u72B6\u6001',
              dataIndex: 'status',
              cell: this.renderStatus,
              width: 65
            })
          )
        )
      );
    }
  }]);

  return LiteTable;
}(_react.Component), _class.displayName = 'LiteTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = LiteTable;
module.exports = exports['default'];