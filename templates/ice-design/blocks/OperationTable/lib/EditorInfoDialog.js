'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialogDecorator = require('./DialogDecorator');

var _DialogDecorator2 = _interopRequireDefault(_DialogDecorator);

var _formBinder = require('@icedesign/form-binder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = require('@icedesign/base/lib/dialog');

var Input = require('@icedesign/base/lib/input');

var Select = require('@icedesign/base/lib/select');

var Grid = require('@icedesign/base/lib/grid');

var Col = Grid.Col,
    Row = Grid.Row;


var typeData = [{ label: '清单', value: '清单' }, { label: '单品', value: '单品' }];

var FormDialog = function (_Component) {
  _inherits(FormDialog, _Component);

  function FormDialog(props) {
    _classCallCheck(this, FormDialog);

    var _this = _possibleConstructorReturn(this, (FormDialog.__proto__ || Object.getPrototypeOf(FormDialog)).call(this, props));

    _this.onFormChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.onOkHandler = function () {
      _this.props.onOk && _this.props.onOk(_this.state.value);
    };

    _this.state = {
      visible: props.visible,
      value: props.value
    };
    return _this;
  }

  _createClass(FormDialog, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Dialog,
        {
          title: '\u7F16\u8F91\u6570\u636E',
          onClose: this.props.onClose,
          onCancel: this.props.onCancel,
          onOk: this.onOkHandler,
          visible: this.state.visible,
          style: { width: 400 }
        },
        _react2.default.createElement(
          _formBinder.FormBinderWrapper,
          {
            value: this.state.value,
            onChange: this.onFormChange
          },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              Row,
              null,
              _react2.default.createElement(
                Col,
                { span: 4 },
                _react2.default.createElement(
                  'span',
                  { style: styles.label },
                  '\u6807\u9898'
                )
              ),
              _react2.default.createElement(
                Col,
                { span: 18 },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  { required: true, max: 20, message: '\u5F53\u524D\u6807\u9898\u5FC5\u586B' },
                  _react2.default.createElement(Input, { style: styles.formField, name: 'title' })
                ),
                _react2.default.createElement(_formBinder.FormError, { name: 'title' })
              )
            ),
            _react2.default.createElement(
              Row,
              { style: styles.row },
              _react2.default.createElement(
                Col,
                { span: 4 },
                _react2.default.createElement(
                  'span',
                  { style: styles.label },
                  '\u7C7B\u578B'
                )
              ),
              _react2.default.createElement(
                Col,
                { span: 18 },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  null,
                  _react2.default.createElement(Select, {
                    dataSource: typeData,
                    style: styles.formField,
                    name: 'type'
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FormDialog;
}(_react.Component);

var styles = {
  row: {
    marginTop: '10px'
  },
  label: {
    lineHeight: '30px'
  },
  formField: {
    width: '100%'
  }
};

exports.default = (0, _DialogDecorator2.default)(FormDialog);
module.exports = exports['default'];