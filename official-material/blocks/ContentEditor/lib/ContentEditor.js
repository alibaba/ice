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

var _formBinder = require('@icedesign/form-binder');

var _RichEditor = require('./RichEditor');

var _RichEditor2 = _interopRequireDefault(_RichEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = require('@icedesign/base/lib/input');

var Grid = require('@icedesign/base/lib/grid');

var Form = require('@icedesign/base/lib/form');

var Button = require('@icedesign/base/lib/button');

var Select = require('@icedesign/base/lib/select');

var Row = Grid.Row,
    Col = Grid.Col;

var FormItem = Form.Item;

var ContentEditor = (_temp = _class = function (_Component) {
  _inherits(ContentEditor, _Component);

  function ContentEditor(props) {
    _classCallCheck(this, ContentEditor);

    var _this = _possibleConstructorReturn(this, (ContentEditor.__proto__ || Object.getPrototypeOf(ContentEditor)).call(this, props));

    _this.formChange = function (value) {
      console.log('value', value);
      _this.setState({
        value: value
      });
    };

    _this.handleSubmit = function () {
      _this.postForm.validateAll(function (errors, values) {
        console.log('errors', errors, 'values', values);
        if (errors) {
          return false;
        }

        // ajax values
      });
    };

    _this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: []
      }
    };
    return _this;
  }

  _createClass(ContentEditor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'content-editor' },
        _react2.default.createElement(
          _formBinder.FormBinderWrapper,
          {
            ref: function ref(refInstance) {
              _this2.postForm = refInstance;
            },
            value: this.state.value,
            onChange: this.formChange
          },
          _react2.default.createElement(
            _container2.default,
            { title: '\u6587\u7AE0\u53D1\u5E03' },
            _react2.default.createElement(
              Form,
              { labelAlign: 'top', style: styles.form },
              _react2.default.createElement(
                Row,
                null,
                _react2.default.createElement(
                  Col,
                  { span: '11' },
                  _react2.default.createElement(
                    FormItem,
                    { label: '\u6807\u9898', required: true },
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      { name: 'title', required: true, message: '\u6807\u9898\u5FC5\u586B' },
                      _react2.default.createElement(Input, { placeholder: '\u8FD9\u91CC\u586B\u5199\u6587\u7AE0\u6807\u9898' })
                    ),
                    _react2.default.createElement(_formBinder.FormError, { name: 'title' })
                  )
                )
              ),
              _react2.default.createElement(
                Row,
                null,
                _react2.default.createElement(
                  Col,
                  { span: '11' },
                  _react2.default.createElement(
                    FormItem,
                    { label: '\u4F5C\u8005', required: true },
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      {
                        name: 'author',
                        required: true,
                        message: '\u4F5C\u8005\u4FE1\u606F\u5FC5\u586B'
                      },
                      _react2.default.createElement(Input, { placeholder: '\u586B\u5199\u4F5C\u8005\u540D\u79F0' })
                    ),
                    _react2.default.createElement(_formBinder.FormError, { name: 'author' })
                  )
                ),
                _react2.default.createElement(
                  Col,
                  { span: '11', offset: '2' },
                  _react2.default.createElement(
                    FormItem,
                    { label: '\u5206\u7C7B', required: true },
                    _react2.default.createElement(
                      _formBinder.FormBinder,
                      {
                        name: 'cats',
                        required: true,
                        type: 'array',
                        message: '\u5206\u7C7B\u5FC5\u586B\u652F\u6301\u591A\u4E2A'
                      },
                      _react2.default.createElement(Select, {
                        style: styles.cats,
                        multiple: true,
                        placeholder: '\u8BF7\u9009\u62E9\u5206\u7C7B',
                        dataSource: [{ label: '分类1', value: 'cat1' }, { label: '分类2', value: 'cat2' }, { label: '分类3', value: 'cat3' }]
                      })
                    ),
                    _react2.default.createElement(_formBinder.FormError, {
                      name: 'cats',
                      render: function render(errors) {
                        console.log('errors', errors);
                        return _react2.default.createElement(
                          'div',
                          null,
                          _react2.default.createElement(
                            'span',
                            { style: { color: 'red' } },
                            errors.map(function (item) {
                              return item.message;
                            }).join(',')
                          ),
                          _react2.default.createElement(
                            'span',
                            { style: { marginLeft: 10 } },
                            '\u4E0D\u77E5\u9053\u9009\u62E9\u4EC0\u4E48\u5206\u7C7B\uFF1F\u8BF7 ',
                            _react2.default.createElement(
                              'a',
                              { href: '#' },
                              '\u70B9\u51FB\u8FD9\u91CC'
                            ),
                            ' ',
                            '\u67E5\u770B'
                          )
                        );
                      }
                    })
                  )
                )
              ),
              _react2.default.createElement(
                FormItem,
                { label: '\u63CF\u8FF0' },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  { name: 'desc' },
                  _react2.default.createElement(Input, { multiple: true, placeholder: '\u8FD9\u91CC\u586B\u5199\u6B63\u6587\u63CF\u8FF0' })
                )
              ),
              _react2.default.createElement(
                FormItem,
                { label: '\u6B63\u6587', required: true },
                _react2.default.createElement(
                  _formBinder.FormBinder,
                  { name: 'body' },
                  _react2.default.createElement(_RichEditor2.default, null)
                )
              ),
              _react2.default.createElement(
                FormItem,
                { label: ' ' },
                _react2.default.createElement(
                  Button,
                  { type: 'primary', onClick: this.handleSubmit },
                  '\u53D1\u5E03\u6587\u7AE0'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ContentEditor;
}(_react.Component), _class.displayName = 'ContentEditor', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = ContentEditor;


var styles = {
  form: {
    marginTop: 30
  },
  cats: {
    width: '100%'
  }
};
module.exports = exports['default'];