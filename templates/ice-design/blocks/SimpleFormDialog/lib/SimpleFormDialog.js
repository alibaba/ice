'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

// 用法：
// import SimpleFormDialog from '...';
//
// SimpleFormDialog.show({
//   onClose: () => {
//     SimpleFormDialog.hide();
//   },
//   onCancel: () => {
//     SimpleFormDialog.hide();
//   },
//   // 点击确认按钮之后，拿到表单数据
//   onOk: value => {
//     console.log('value', value);
//   },
//   // 回填数据
//   value: {
//     type: 'video'
//   }
// });

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formBinder = require('@icedesign/form-binder');

var _CreateFuncDialog = require('./CreateFuncDialog');

var _CreateFuncDialog2 = _interopRequireDefault(_CreateFuncDialog);

require('./SimpleFormDialog.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = require('@icedesign/base/lib/dialog');

var Grid = require('@icedesign/base/lib/grid');

var Input = require('@icedesign/base/lib/input');

var Radio = require('@icedesign/base/lib/radio');

var Row = Grid.Row,
    Col = Grid.Col;
var RadioGroup = Radio.Group;


var defaultValue = {
  keywords: '',
  type: 'post',
  content: ''
};

var SimpleFormDialog = (_temp = _class = function (_Component) {
  _inherits(SimpleFormDialog, _Component);

  function SimpleFormDialog(props) {
    _classCallCheck(this, SimpleFormDialog);

    var _this = _possibleConstructorReturn(this, (SimpleFormDialog.__proto__ || Object.getPrototypeOf(SimpleFormDialog)).call(this, props));

    _this.onOk = function () {
      _this.refForm.validateAll(function (errors, values) {
        if (errors) {
          return;
        }
        if (typeof _this.props.onOk === 'function') {
          _this.props.onOk(values);
        }
      });
    };

    _this.onFormChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.state = {
      visible: props.visible,
      value: props.value || defaultValue
    };
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(SimpleFormDialog, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _extends2;

      return _react2.default.createElement(
        Dialog,
        _extends((_extends2 = {
          className: 'simple-form-dialog',
          style: styles.simpleFormDialog
        }, _defineProperty(_extends2, 'style', styles.dialog), _defineProperty(_extends2, 'autoFocus', false), _defineProperty(_extends2, 'footerAlign', 'center'), _defineProperty(_extends2, 'title', '\u7B80\u5355\u8868\u5355'), _extends2), this.props, {
          onOk: this.onOk,
          isFullScreen: true,
          visible: this.state.visible
        }),
        _react2.default.createElement(
          _formBinder.FormBinderWrapper,
          {
            ref: function ref(_ref) {
              _this2.refForm = _ref;
            },
            value: this.state.value,
            onChange: this.onFormChange
          },
          _react2.default.createElement(
            'div',
            { style: styles.dialogContent },
            _react2.default.createElement(
              Row,
              { style: styles.formRow },
              _react2.default.createElement(
                Col,
                { span: '3' },
                _react2.default.createElement(
                  'label',
                  { style: styles.formLabel },
                  '\u5173\u952E\u8BCD'
                )
              ),
              _react2.default.createElement(
                Col,
                { span: '16' },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  {
                    required: true,
                    min: 2,
                    max: 10,
                    message: '\u5F53\u524D\u5B57\u6BB5\u5FC5\u586B\uFF0C\u4E14\u6700\u5C11 2 \u4E2A\u5B57\u6700\u591A 10 \u4E2A\u5B57'
                  },
                  _react2.default.createElement(Input, {
                    name: 'keywords',
                    style: styles.input,
                    placeholder: '\u591A\u5173\u952E\u8BCD\u7528\u82F1\u6587 , \u53F7\u5206\u5272'
                  })
                ),
                _react2.default.createElement(_formBinder.FormError, { name: 'keywords' })
              )
            ),
            _react2.default.createElement(
              Row,
              { style: styles.formRow },
              _react2.default.createElement(
                Col,
                null,
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  null,
                  _react2.default.createElement(RadioGroup, {
                    name: 'type',
                    dataSource: [{
                      value: 'post',
                      label: '文章'
                    }, {
                      value: 'video',
                      label: '视频'
                    }, {
                      value: 'image',
                      label: '图片'
                    }]
                  })
                )
              )
            ),
            _react2.default.createElement(
              Row,
              { style: styles.formRow },
              _react2.default.createElement(
                Col,
                null,
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  null,
                  _react2.default.createElement(Input, {
                    name: 'content',
                    style: styles.input,
                    multiple: true,
                    placeholder: '\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5185\u5BB9',
                    rows: 4
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SimpleFormDialog;
}(_react.Component), _class.displayName = 'SimpleFormDialog', _temp);


var styles = { dialog: { width: '640px' }, dialogContent: {}, formRow: { marginTop: 20 }, input: { width: '100%' }, formLabel: { lineHeight: '26px' }, simpleFormDialog: {} };

exports.default = (0, _CreateFuncDialog2.default)(SimpleFormDialog);
module.exports = exports['default'];