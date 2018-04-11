'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _CustomTable = require('./components/CustomTable');

var _CustomTable2 = _interopRequireDefault(_CustomTable);

var _EditDialog = require('./components/EditDialog');

var _EditDialog2 = _interopRequireDefault(_EditDialog);

var _DeleteBalloon = require('./components/DeleteBalloon');

var _DeleteBalloon2 = _interopRequireDefault(_DeleteBalloon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = require('@icedesign/base/lib/tab');

var TabPane = Tab.TabPane;

var tabs = [{ tab: '全部', key: 'all' }, { tab: '已发布', key: 'inreview' }, { tab: '审核中', key: 'released' }, { tab: '已拒绝', key: 'rejected' }];

var TabTable = (_temp = _class = function (_Component) {
  _inherits(TabTable, _Component);

  function TabTable(props) {
    _classCallCheck(this, TabTable);

    var _this = _possibleConstructorReturn(this, (TabTable.__proto__ || Object.getPrototypeOf(TabTable)).call(this, props));

    _this.getFormValues = function (dataIndex, values) {
      var _this$state = _this.state,
          dataSource = _this$state.dataSource,
          tabKey = _this$state.tabKey;

      dataSource[tabKey][dataIndex] = values;
      _this.setState({
        dataSource: dataSource
      });
    };

    _this.handleRemove = function (value, index) {
      var _this$state2 = _this.state,
          dataSource = _this$state2.dataSource,
          tabKey = _this$state2.tabKey;

      dataSource[tabKey].splice(index, 1);
      _this.setState({
        dataSource: dataSource
      });
    };

    _this.handleTabChange = function (key) {
      _this.setState({
        tabKey: key
      });
    };

    _this.state = {
      dataSource: {},
      tabKey: 'all'
    };
    _this.columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '发布时间',
      dataIndex: 'date',
      key: 'date'
    }, {
      title: '操作',
      key: 'action',
      render: function render(value, index, record) {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_EditDialog2.default, {
            index: index,
            record: record,
            getFormValues: _this.getFormValues
          }),
          _react2.default.createElement(_DeleteBalloon2.default, {
            handleRemove: function handleRemove() {
              return _this.handleRemove(value, index, record);
            }
          })
        );
      }
    }];
    return _this;
  }

  _createClass(TabTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _axios2.default.get('/mock/tab-table.json').then(function (response) {
        console.log(response.data.data);
        _this2.setState({
          dataSource: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dataSource = this.state.dataSource;

      return _react2.default.createElement(
        'div',
        { className: 'tab-table' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            Tab,
            { onChange: this.handleTabChange },
            tabs.map(function (item) {
              return _react2.default.createElement(
                TabPane,
                { tab: item.tab, key: item.key },
                _react2.default.createElement(_CustomTable2.default, {
                  dataSource: dataSource[_this3.state.tabKey],
                  columns: _this3.columns,
                  hasBorder: false
                })
              );
            })
          )
        )
      );
    }
  }]);

  return TabTable;
}(_react.Component), _class.displayName = 'TabTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = TabTable;
module.exports = exports['default'];