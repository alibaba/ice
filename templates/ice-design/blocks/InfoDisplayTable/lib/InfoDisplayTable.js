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

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./InfoDisplayTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

/**
 * 表格接收的数据
 */
var dataSource = function dataSource() {
  return [{
    label: '姓名',
    value: '张三'
  }, {
    label: '性别',
    value: '男'
  }, {
    label: '年龄',
    value: '25'
  }, {
    label: '籍贯',
    value: '杭州'
  }, {
    label: '职业',
    value: '程序员'
  }];
};

var InfoDisplayTable = (_temp = _class = function (_Component) {
  _inherits(InfoDisplayTable, _Component);

  function InfoDisplayTable(props) {
    _classCallCheck(this, InfoDisplayTable);

    var _this = _possibleConstructorReturn(this, (InfoDisplayTable.__proto__ || Object.getPrototypeOf(InfoDisplayTable)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(InfoDisplayTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
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
      return _react2.default.createElement(
        'div',
        { className: 'info-display-table', style: styles.infoDisplayTable },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            Table,
            { dataSource: dataSource() },
            _react2.default.createElement(Table.Column, { title: '\u4E2A\u4EBA\u4FE1\u606F', dataIndex: 'label' }),
            _react2.default.createElement(Table.Column, { title: '', dataIndex: 'value' })
          )
        )
      );
    }
  }]);

  return InfoDisplayTable;
}(_react.Component), _class.displayName = 'InfoDisplayTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = InfoDisplayTable;


var styles = { "infoDisplayTable": {} };
module.exports = exports['default'];