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

require('./PrivateMessageForm.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var PrivateMessageForm = (_temp = _class = function (_Component) {
  _inherits(PrivateMessageForm, _Component);

  function PrivateMessageForm(props) {
    _classCallCheck(this, PrivateMessageForm);

    var _this = _possibleConstructorReturn(this, (PrivateMessageForm.__proto__ || Object.getPrototypeOf(PrivateMessageForm)).call(this, props));

    _this.titleChange = function (title) {
      _this.setState({
        title: title
      });
    };

    _this.messageChange = function (message) {
      _this.setState({
        message: message
      });
    };

    _this.sendMessage = function () {
      console.log(_this.state);
    };

    _this.state = {
      title: '',
      message: ''
    };
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(PrivateMessageForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'private-message-form', style: styles.privateMessageForm },
        _react2.default.createElement(
          _card2.default,
          { style: styles.formCard },
          _react2.default.createElement(
            'div',
            { style: styles.title },
            '\u79C1\u6709\u6D88\u606F'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.subtitle },
            '\u7ED9\u738B\u660E\u660E\u53D1\u79C1\u6709\u6D88\u606F'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.groupTitle },
            '\u6807\u9898'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.inputWrap },
            _react2.default.createElement(Input, {
              style: styles.input,
              value: this.state.title,
              onChange: this.titleChange,
              placeholder: '\u8BF7\u8F93\u5165\u6807\u9898'
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.groupTitle },
            '\u6D88\u606F\u5185\u5BB9'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textareaWrap },
            _react2.default.createElement(Input, {
              style: styles.textarea,
              multiple: true,
              value: this.state.message,
              onChange: this.messageChange,
              placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9'
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.btnWrap },
            _react2.default.createElement(
              Button,
              { type: 'primary', onClick: this.sendMessage },
              '\u53D1\u9001\u6D88\u606F'
            )
          )
        )
      );
    }
  }]);

  return PrivateMessageForm;
}(_react.Component), _class.displayName = 'PrivateMessageForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = PrivateMessageForm;


var styles = { formCard: { width: 518, paddingLeft: '30px' }, title: { fontSize: '16px', marginBottom: '10px', color: '#000', fontWeight: 'bold' }, subtitle: { color: '#000', fontSize: '14px', marginBottom: '30px' }, groupTitle: { marginBottom: '10px' }, input: { width: '332px', marginBottom: '20px' }, textarea: { width: '332px', heihgt: '85px' }, textareaWrap: { marginBottom: '20px' }, privateMessageForm: {} };
module.exports = exports['default'];