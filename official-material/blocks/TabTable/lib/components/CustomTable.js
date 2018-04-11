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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var CustomTable = (_temp = _class = function (_Component) {
  _inherits(CustomTable, _Component);

  function CustomTable(props) {
    _classCallCheck(this, CustomTable);

    var _this = _possibleConstructorReturn(this, (CustomTable.__proto__ || Object.getPrototypeOf(CustomTable)).call(this, props));

    _this.renderColumns = function () {
      var columns = _this.props.columns;

      return columns.map(function (item) {
        if (typeof item.render === 'function') {
          return _react2.default.createElement(Table.Column, {
            title: item.title,
            key: item.key,
            cell: item.render,
            width: item.width || 150
          });
        }

        return _react2.default.createElement(Table.Column, {
          key: item.key,
          title: item.title,
          dataIndex: item.dataIndex,
          width: item.width || 150
        });
      });
    };

    _this.state = {};
    return _this;
  }

  _createClass(CustomTable, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Table,
        this.props,
        this.renderColumns()
      );
    }
  }]);

  return CustomTable;
}(_react.Component), _class.displayName = 'CustomTable', _class.propTypes = {
  dataSource: _propTypes2.default.array,
  columns: _propTypes2.default.array.isRequired
}, _class.defaultProps = {
  dataSource: []
}, _temp);
exports.default = CustomTable;
module.exports = exports['default'];