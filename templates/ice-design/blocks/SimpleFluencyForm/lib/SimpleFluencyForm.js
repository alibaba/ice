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

var _formBinder = require('@icedesign/form-binder');

require('./SimpleFluencyForm.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step = require('@icedesign/base/lib/step');

var Grid = require('@icedesign/base/lib/grid');

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var Row = Grid.Row,
    Col = Grid.Col;

var telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

var SimpleFluencyForm = (_temp = _class = function (_Component) {
  _inherits(SimpleFluencyForm, _Component);

  function SimpleFluencyForm(props) {
    _classCallCheck(this, SimpleFluencyForm);

    var _this = _possibleConstructorReturn(this, (SimpleFluencyForm.__proto__ || Object.getPrototypeOf(SimpleFluencyForm)).call(this, props));

    _this.formChange = function (newValue) {
      _this.setState({
        formValue: newValue
      });
    };

    _this.nextStep = function () {
      _this.form.validateAll(function (error, value) {
        console.log(value);
        if (!error || error.length === 0) {
          _this.setState({ step: _this.state.step + 1 });
        }
      });
    };

    _this.renderStep = function (step) {
      if (step === 0) {
        var _this$state$formValue = _this.state.formValue,
            username = _this$state$formValue.username,
            email = _this$state$formValue.email,
            phone = _this$state$formValue.phone,
            address = _this$state$formValue.address;

        var initValue = {
          username: username, email: email, phone: phone, address: address
        };
        return _react2.default.createElement(
          _card2.default,
          { style: styles.form },
          _react2.default.createElement(
            _formBinder.FormBinderWrapper,
            {
              ref: function ref(form) {
                _this.form = form;
              },
              value: initValue,
              onChange: _this.formChange
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                Row,
                { style: styles.formRow },
                _react2.default.createElement(
                  Col,
                  { fixedSpan: 8, style: styles.formLabel },
                  _react2.default.createElement(
                    'span',
                    null,
                    '\u59D3\u540D\uFF1A'
                  )
                ),
                _react2.default.createElement(
                  Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { required: true, message: '\u5FC5\u586B\u9879' },
                    _react2.default.createElement(Input, { name: 'username' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'username' })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formRow },
                _react2.default.createElement(
                  Col,
                  { fixedSpan: 8, style: styles.formLabel },
                  '\u90AE\u7BB1\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { type: 'email', required: true, message: '\u90AE\u7BB1\u4E0D\u5408\u6CD5' },
                    _react2.default.createElement(Input, { name: 'email' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'email' })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formRow },
                _react2.default.createElement(
                  Col,
                  { fixedSpan: 8, style: styles.formLabel },
                  '\u7535\u8BDD\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { required: true, message: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u7535\u8BDD\u53F7\u7801', pattern: telPattern, triggerType: 'onBlur' },
                    _react2.default.createElement(Input, { name: 'phone' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'phone' })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formRow },
                _react2.default.createElement(
                  Col,
                  { fixedSpan: 8, style: styles.formLabel },
                  '\u5730\u5740\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    null,
                    _react2.default.createElement(Input, { required: true, message: '\u5FC5\u586B', multiple: true, name: 'address' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: styles.formErrorWrapper },
                    _react2.default.createElement(_formBinder.FormError, { name: 'address' })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                null,
                _react2.default.createElement(
                  Col,
                  { fixedOffset: 8 },
                  _react2.default.createElement(
                    Button,
                    { onClick: _this.nextStep, type: 'primary' },
                    '\u4E0B\u4E00\u6B65'
                  )
                )
              )
            )
          )
        );
      } else if (step === 1) {
        return _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'span',
            null,
            '\u6B65\u9AA4\u4E8C'
          )
        );
      } else if (step === 2) {
        return _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'span',
            null,
            '\u6B65\u9AA4\u4E09'
          )
        );
      }
    };

    _this.state = {
      step: 0,
      formValue: {
        username: '',
        email: '',
        phone: '',
        address: ''
      }
    };
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(SimpleFluencyForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'simple-fluency-form', style: styles.simpleFluencyForm },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            Step,
            { current: this.state.step, type: 'dot' },
            _react2.default.createElement(Step.Item, { key: 0, title: '\u586B\u5199\u4FE1\u606F' }),
            _react2.default.createElement(Step.Item, { key: 1, title: '\u786E\u8BA4\u4FE1\u606F' }),
            _react2.default.createElement(Step.Item, { key: 2, title: '\u5B8C\u6210' })
          )
        ),
        this.renderStep(this.state.step)
      );
    }
  }]);

  return SimpleFluencyForm;
}(_react.Component), _class.displayName = 'SimpleFluencyForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleFluencyForm;


var styles = { formLabel: { textAlign: 'right', lineHeight: '1.7rem', paddingRight: '10px' }, formRow: { marginBottom: '20px' }, form: { padding: '40px 0 20px' }, formErrorWrapper: { marginTop: '5px' }, simpleFluencyForm: {} };
module.exports = exports['default'];