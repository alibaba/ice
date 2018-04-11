'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint  react/no-string-refs: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _formBinder = require('@icedesign/form-binder');

require('./SettingsForm.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Button = require('@icedesign/base/lib/button');

var Radio = require('@icedesign/base/lib/radio');

var Switch = require('@icedesign/base/lib/switch');

var Upload = require('@icedesign/base/lib/upload');

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;
var RadioGroup = Radio.Group;
var ImageUpload = Upload.ImageUpload;


function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

var SettingsForm = (_temp = _class = function (_Component) {
  _inherits(SettingsForm, _Component);

  function SettingsForm(props) {
    _classCallCheck(this, SettingsForm);

    var _this = _possibleConstructorReturn(this, (SettingsForm.__proto__ || Object.getPrototypeOf(SettingsForm)).call(this, props));

    _this.onDragOver = function () {
      console.log('dragover callback');
    };

    _this.onDrop = function (fileList) {
      console.log('drop callback : ', fileList);
    };

    _this.formChange = function (value) {
      console.log('value', value);
      _this.setState({
        value: value
      });
    };

    _this.validateAllFormField = function () {
      _this.refs.form.validateAll(function (errors, values) {
        console.log('errors', errors, 'values', values);
      });
    };

    _this.state = {
      value: {
        name: '',
        gender: 'male',
        notice: false,
        email: '',
        avatar: '',
        siteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        description: ''
      }
    };
    return _this;
  }

  _createClass(SettingsForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'settings-form' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            _formBinder.FormBinderWrapper,
            {
              value: this.state.value,
              onChange: this.formChange,
              ref: 'form'
            },
            _react2.default.createElement(
              'div',
              { style: styles.formContent },
              _react2.default.createElement(
                'h2',
                { style: styles.formTitle },
                '\u57FA\u672C\u8BBE\u7F6E'
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u59D3\u540D\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'name', required: true, max: 10, message: '\u5FC5\u586B' },
                    _react2.default.createElement(Input, { size: 'large', placeholder: '\u4E8E\u6C5F\u6C34' })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'name' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u5934\u50CF\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'avatar', required: true, message: '\u5FC5\u586B' },
                    _react2.default.createElement(ImageUpload, {
                      listType: 'picture-card',
                      action: '',
                      accept: 'image/png, image/jpg, image/jpeg, image/gif, image/bmp',
                      locale: {
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片'
                        }
                      },
                      beforeUpload: beforeUpload,
                      onChange: onChange,
                      onSuccess: onSuccess,
                      onError: onError
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'avatar' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u6027\u522B\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'gender', required: true, message: '\u5FC5\u586B' },
                    _react2.default.createElement(
                      RadioGroup,
                      null,
                      _react2.default.createElement(
                        Radio,
                        { value: 'male' },
                        '\u7537'
                      ),
                      _react2.default.createElement(
                        Radio,
                        { value: 'female' },
                        '\u5973'
                      )
                    )
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'gender' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u901A\u77E5\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { type: 'boolean', name: 'notice' },
                    _react2.default.createElement(Switch, null)
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'notice' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u90AE\u4EF6\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      type: 'email',
                      name: 'email',
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u4EF6'
                    },
                    _react2.default.createElement(Input, {
                      size: 'large',
                      placeholder: 'ice-admin@alibaba-inc.com'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'email' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u7F51\u7AD9\u5730\u5740 \uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      type: 'url',
                      name: 'siteUrl',
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7F51\u7AD9\u5730\u5740'
                    },
                    _react2.default.createElement(Input, {
                      size: 'large',
                      type: 'url',
                      placeholder: 'https://alibaba.github.io/ice'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, {
                    style: { marginLeft: 10 },
                    name: 'siteUrl',
                    required: true,
                    message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7F51\u7AD9\u5730\u5740'
                  })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  'Github\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      type: 'url',
                      name: 'githubUrl',
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684 Github \u5730\u5740'
                    },
                    _react2.default.createElement(Input, {
                      size: 'large',
                      placeholder: 'https://github.com/alibaba/ice'
                    })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'githubUrl' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  'Twitter\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    {
                      type: 'url',
                      name: 'twitterUrl',
                      required: true,
                      message: '\u8BF7\u8F93\u5165\u6B63\u786E\u7684 Twitter \u5730\u5740'
                    },
                    _react2.default.createElement(Input, { size: 'large', placeholder: 'https://twitter.com' })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'twitterUrl' })
                )
              ),
              _react2.default.createElement(
                Row,
                { style: styles.formItem },
                _react2.default.createElement(
                  Col,
                  { xxs: '6', s: '3', l: '3', style: styles.label },
                  '\u81EA\u6211\u63CF\u8FF0\uFF1A'
                ),
                _react2.default.createElement(
                  Col,
                  { s: '12', l: '10' },
                  _react2.default.createElement(
                    _formBinder.FormBinder,
                    { name: 'description' },
                    _react2.default.createElement(Input, { size: 'large', multiple: true, placeholder: '\u8BF7\u8F93\u5165\u63CF\u8FF0...' })
                  ),
                  _react2.default.createElement(_formBinder.FormError, { name: 'description' })
                )
              )
            )
          ),
          _react2.default.createElement(
            Row,
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              Col,
              { offset: '3' },
              _react2.default.createElement(
                Button,
                {
                  size: 'large',
                  type: 'primary',
                  style: { width: 100 },
                  onClick: this.validateAllFormField
                },
                '\u63D0 \u4EA4'
              )
            )
          )
        )
      );
    }
  }]);

  return SettingsForm;
}(_react.Component), _class.displayName = 'SettingsForm', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SettingsForm;


var styles = {
  label: {
    textAlign: 'right'
  },
  formContent: {
    width: '100%',
    position: 'relative'
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
  }
};
module.exports = exports['default'];