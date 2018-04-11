'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint react/no-string-refs:0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formBinder = require('@icedesign/form-binder');

var _icon = require('@icedesign/icon');

var _icon2 = _interopRequireDefault(_icon);

require('./UserLogin.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var Checkbox = require('@icedesign/base/lib/checkbox');

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;

// 寻找背景图片可以从 https://unsplash.com/ 寻找

var backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

var UserLogin = (_temp = _class = function (_Component) {
  _inherits(UserLogin, _Component);

  function UserLogin(props) {
    _classCallCheck(this, UserLogin);

    var _this = _possibleConstructorReturn(this, (UserLogin.__proto__ || Object.getPrototypeOf(UserLogin)).call(this, props));

    _this.formChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.refs.form.validateAll(function (errors, values) {
        if (errors) {
          console.log('errors', errors);
          return;
        }
        console.log('values:', values);
        _this.props.push('/');
      });
    };

    _this.state = {
      value: {
        account: undefined,
        password: undefined,
        checkbox: false
      }
    };
    return _this;
  }

  _createClass(UserLogin, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: styles.userLogin, className: 'user-login' },
        _react2.default.createElement('div', {
          style: _extends({}, styles.userLoginBg, {
            backgroundImage: 'url(' + backgroundImage + ')'
          })
        }),
        _react2.default.createElement(
          'div',
          { style: styles.contentWrapper, className: 'content-wrapper' },
          _react2.default.createElement(
            'h2',
            { style: styles.slogan, className: 'slogan' },
            '\u6B22\u8FCE\u4F7F\u7528 ',
            _react2.default.createElement('br', null),
            ' ICE \u5185\u5BB9\u7BA1\u7406\u7CFB\u7EDF'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.formContainer },
            _react2.default.createElement(
              'h4',
              { style: styles.formTitle },
              '\u767B\u5F55'
            ),
            _react2.default.createElement(
              _formBinder.FormBinderWrapper,
              {
                value: this.state.value,
                onChange: this.formChange,
                ref: 'form'
              },
              _react2.default.createElement(
                'div',
                { style: styles.formItems },
                _react2.default.createElement(
                  Row,
                  { style: styles.formItem },
                  _react2.default.createElement(
                    Col,
                    null,
                    _react2.default.createElement(_icon2.default, {
                      type: 'person',
                      size: 'small',
                      style: styles.inputIcon
                    }),
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      { name: 'account', required: true, message: '\u5FC5\u586B' },
                      _react2.default.createElement(Input, { maxLength: 20, placeholder: '\u4F1A\u5458\u540D/\u90AE\u7BB1/\u624B\u673A\u53F7' })
                    )
                  ),
                  _react2.default.createElement(
                    Col,
                    null,
                    _react2.default.createElement(_formBinder.FormError, { name: 'account' })
                  )
                ),
                _react2.default.createElement(
                  Row,
                  { style: styles.formItem },
                  _react2.default.createElement(
                    Col,
                    null,
                    _react2.default.createElement(_icon2.default, {
                      type: 'lock',
                      size: 'small',
                      style: styles.inputIcon
                    }),
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      { name: 'password' },
                      _react2.default.createElement(Input, { htmlType: 'password', placeholder: '\u5BC6\u7801' })
                    )
                  ),
                  _react2.default.createElement(
                    Col,
                    null,
                    _react2.default.createElement(_formBinder.FormError, { name: 'account' })
                  )
                ),
                _react2.default.createElement(
                  Row,
                  { style: styles.formItem },
                  _react2.default.createElement(
                    Col,
                    null,
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      { name: 'checkbox' },
                      _react2.default.createElement(
                        Checkbox,
                        { style: styles.checkbox },
                        '\u8BB0\u4F4F\u8D26\u53F7'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  Row,
                  { style: styles.formItem },
                  _react2.default.createElement(
                    Button,
                    {
                      type: 'primary',
                      onClick: this.handleSubmit,
                      style: styles.submitBtn
                    },
                    '\u767B \u5F55'
                  )
                ),
                _react2.default.createElement(
                  Row,
                  { className: 'tips', style: styles.tips },
                  _react2.default.createElement(
                    'a',
                    { href: '/', style: styles.link },
                    '\u7ACB\u5373\u6CE8\u518C'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.line },
                    '|'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '/', style: styles.link },
                    '\u5FD8\u8BB0\u5BC6\u7801'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UserLogin;
}(_react.Component), _class.displayName = 'UserLogin', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = UserLogin;


var styles = {
  userLogin: {
    position: 'relative',
    height: '100vh'
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee'
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column'
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px'
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999'
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px'
  },
  checkbox: {
    marginLeft: '5px'
  },
  tips: {
    textAlign: 'center'
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px'
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px'
  }
};
module.exports = exports['default'];