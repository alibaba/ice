'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = require('@icedesign/base/lib/dialog');

var Button = require('@icedesign/base/lib/button');

var Form = require('@icedesign/base/lib/form');

var Input = require('@icedesign/base/lib/input');

var Field = require('@icedesign/base/lib/field');

var FormItem = Form.Item;

var EditDialog = (_temp = _class = function (_Component) {
  _inherits(EditDialog, _Component);

  function EditDialog(props) {
    _classCallCheck(this, EditDialog);

    var _this = _possibleConstructorReturn(this, (EditDialog.__proto__ || Object.getPrototypeOf(EditDialog)).call(this, props));

    _this.handleSubmit = function () {
      _this.field.validate(function (errors, values) {
        if (errors) {
          console.log('Errors in form!!!');
          return;
        }

        var dataIndex = _this.state.dataIndex;

        _this.props.getFormValues(dataIndex, values);
        _this.setState({
          visible: false
        });
      });
    };

    _this.onOpen = function (index, record) {
      _this.field.setValues(_extends({}, record));
      _this.setState({
        visible: true,
        dataIndex: index
      });
    };

    _this.onClose = function () {
      _this.setState({
        visible: false
      });
    };

    _this.state = {
      visible: false,
      dataIndex: null
    };
    _this.field = new Field(_this);
    return _this;
  }

  _createClass(EditDialog, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var init = this.field.init;
      var _props = this.props,
          index = _props.index,
          record = _props.record;

      var formItemLayout = {
        labelCol: {
          fixedSpan: 6
        },
        wrapperCol: {
          span: 14
        }
      };

      return _react2.default.createElement(
        'div',
        { style: styles.editDialog },
        _react2.default.createElement(
          Button,
          {
            size: 'small',
            type: 'primary',
            onClick: function onClick() {
              return _this2.onOpen(index, record);
            }
          },
          '\u7F16\u8F91'
        ),
        _react2.default.createElement(
          Dialog,
          {
            style: { width: 640 },
            visible: this.state.visible,
            onOk: this.handleSubmit,
            closable: 'esc,mask,close',
            onCancel: this.onClose,
            onClose: this.onClose,
            title: '\u7F16\u8F91'
          },
          _react2.default.createElement(
            Form,
            { direction: 'ver', field: this.field },
            _react2.default.createElement(
              FormItem,
              _extends({ label: '\u6807\u9898\uFF1A' }, formItemLayout),
              _react2.default.createElement(Input, init('title', {
                rules: [{ required: true, message: '必填选项' }]
              }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({ label: '\u4F5C\u8005\uFF1A' }, formItemLayout),
              _react2.default.createElement(Input, init('author', {
                rules: [{ required: true, message: '必填选项' }]
              }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({ label: '\u72B6\u6001\uFF1A' }, formItemLayout),
              _react2.default.createElement(Input, init('status', {
                rules: [{ required: true, message: '必填选项' }]
              }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({ label: '\u53D1\u5E03\u65F6\u95F4\uFF1A' }, formItemLayout),
              _react2.default.createElement(Input, init('date', {
                rules: [{ required: true, message: '必填选项' }]
              }))
            )
          )
        )
      );
    }
  }]);

  return EditDialog;
}(_react.Component), _class.displayName = 'EditDialog', _class.defaultProps = {}, _temp);
exports.default = EditDialog;


var styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px'
  }
};
module.exports = exports['default'];