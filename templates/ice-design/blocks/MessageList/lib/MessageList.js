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

require('./MessageList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = require('@icedesign/base/lib/pagination');

var dataSource = [{
  title: '消息标题',
  message: '您的账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。',
  datetime: '07-07   18:36'
}, {
  title: '消息标题',
  message: '您的账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。',
  datetime: '07-07   18:36'
}, {
  title: '消息标题',
  message: '您的账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。',
  datetime: '07-07   18:36'
}, {
  title: '消息标题',
  message: '您的账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。',
  datetime: '07-07   18:36'
}, {
  title: '消息标题',
  message: '您的账号在2017.4.1日发布的文章《夏日阳光穿搭》中出现恶意引导，违反了商业规则，即日起封号，30天内不得重新申请入驻。',
  datetime: '07-07   18:36'
}];

var MessageList = (_temp = _class = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList(props) {
    _classCallCheck(this, MessageList);

    var _this = _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, props));

    _this.renderItem = function (item, idx) {
      return _react2.default.createElement(
        'div',
        { style: styles.item, key: idx },
        _react2.default.createElement(
          'div',
          { style: styles.title },
          item.title,
          _react2.default.createElement(
            'span',
            { style: styles.datetime },
            item.datetime
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.message },
          item.message
        )
      );
    };

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(MessageList, [{
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
        { className: 'message-list', style: styles.messageList },
        _react2.default.createElement(
          _card2.default,
          null,
          dataSource.map(this.renderItem),
          _react2.default.createElement(
            'div',
            { style: styles.paginationWarp },
            _react2.default.createElement(Pagination, null)
          )
        )
      );
    }
  }]);

  return MessageList;
}(_react.Component), _class.displayName = 'MessageList', _temp);
exports.default = MessageList;


var styles = { item: { borderBottom: '1px solid #eee', margin: '0 15px 20px' }, title: { fontSize: '16px', color: '#444', marginBottom: '15px', position: 'relative' }, datetime: { position: 'absolute', right: '10px', paddingTop: '10px', fontSize: '12px', color: '#666' }, message: { fontSize: '14px', color: '#666', marginBottom: '20px', width: '790px' }, paginationWarp: { marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }, messageList: {} };
module.exports = exports['default'];