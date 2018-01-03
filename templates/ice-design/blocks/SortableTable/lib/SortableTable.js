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

require('./SortableTable.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = require('@icedesign/base/lib/table');

var Icon = require('@icedesign/base/lib/icon');

var Button = require('@icedesign/base/lib/button');

var generatorData = function generatorData() {
  return Array.from({ length: 5 }).map(function (item, index) {
    console.log('item', item);
    return {
      todo: '\u5F85\u529E\u4E8B\u9879 ' + index,
      memo: '\u5907\u6CE8\u8BF4\u660E\u6587\u6848 ' + index,
      validity: '2017-12-12'
    };
  });
};

var SortableTable = (_temp = _class = function (_Component) {
  _inherits(SortableTable, _Component);

  function SortableTable(props) {
    _classCallCheck(this, SortableTable);

    var _this = _possibleConstructorReturn(this, (SortableTable.__proto__ || Object.getPrototypeOf(SortableTable)).call(this, props));

    _this.moveUp = function (index) {
      if (index > 0) {
        var dataSource = _this.state.dataSource;
        var prevItem = dataSource[index - 1];
        var currentItem = dataSource[index];
        dataSource.splice(index - 1, 2, currentItem, prevItem);
        _this.setState({
          dataSource: dataSource
        });
      }
    };

    _this.moveDown = function (index) {
      if (index < _this.state.dataSource.length - 1) {
        var dataSource = _this.state.dataSource;
        var currentItem = dataSource[index];
        var nextItem = dataSource[index + 1];
        dataSource.splice(index, 2, nextItem, currentItem);
        _this.setState({
          dataSource: dataSource
        });
      }
    };

    _this.renderOrder = function (value, index, record) {
      return _react2.default.createElement(
        'span',
        null,
        index
      );
    };

    _this.renderSortButton = function (value, index, record) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          Button,
          {
            onClick: _this.moveDown.bind(_this, index),
            size: 'large',
            shape: 'text',
            disabled: index === _this.state.dataSource.length - 1
          },
          _react2.default.createElement(Icon, { title: '\u4E0B\u79FB', type: 'descending' })
        ),
        _react2.default.createElement(
          Button,
          {
            onClick: _this.moveUp.bind(_this, index),
            size: 'large',
            shape: 'text',
            disabled: index === 0
          },
          _react2.default.createElement(Icon, { title: '\u4E0A\u79FB', type: 'ascending' })
        )
      );
    };

    _this.state = {
      dataSource: generatorData()
    };
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(SortableTable, [{
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
        { className: 'sortable-table', style: styles.sortableTable },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            Table,
            { dataSource: this.state.dataSource, hasBorder: false },
            _react2.default.createElement(Table.Column, { width: 80, title: '\u987A\u5E8F', cell: this.renderOrder }),
            _react2.default.createElement(Table.Column, { width: 280, title: '\u5F85\u529E\u4E8B\u9879', dataIndex: 'todo' }),
            _react2.default.createElement(Table.Column, { width: 240, title: '\u5907\u6CE8', dataIndex: 'memo' }),
            _react2.default.createElement(Table.Column, { width: 180, title: '\u6709\u6548\u65F6\u95F4', dataIndex: 'validity' }),
            _react2.default.createElement(Table.Column, { title: '\u6392\u5E8F', cell: this.renderSortButton })
          )
        )
      );
    }
  }]);

  return SortableTable;
}(_react.Component), _class.displayName = 'SortableTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SortableTable;


var styles = {
  sortableTable: {}
};
module.exports = exports['default'];