import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Dialog from '@icedesign/base/lib/dialog';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Radio from '@icedesign/base/lib/radio';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError } from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

var Row = _Grid.Row,
    Col = _Grid.Col;
var RadioGroup = _Radio.Group;


var defaultValue = {
  keywords: '',
  type: 'post',
  content: ''
};

var SimpleFormDialog = (_temp = _class = function (_Component) {
  _inherits(SimpleFormDialog, _Component);

  function SimpleFormDialog(props) {
    _classCallCheck(this, SimpleFormDialog);

    var _this = _possibleConstructorReturn(this, (SimpleFormDialog.__proto__ || _Object$getPrototypeOf(SimpleFormDialog)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.showDialog = function () {
      _this.setState({
        visible: true
      });
    };

    _this.hideDialog = function () {
      _this.setState({
        visible: false
      });
    };

    _this.onOk = function () {
      _this.refForm.validateAll(function (error) {
        if (error) {
          // show validate error
          return;
        }
        // deal with value

        _this.hideDialog();
      });
    };

    _this.onFormChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false
    };
    return _this;
  }

  _createClass(SimpleFormDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isMobile = this.state.isMobile;

      var simpleFormDialog = _extends({}, styles.simpleFormDialog);
      // 响应式处理
      if (isMobile) {
        simpleFormDialog.width = '300px';
      }

      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          _Dialog,
          _extends({
            className: 'simple-form-dialog',
            style: simpleFormDialog,
            autoFocus: false,
            footerAlign: 'center',
            title: '\u7B80\u5355\u8868\u5355'
          }, this.props, {
            onOk: this.onOk,
            onCancel: this.hideDialog,
            onClose: this.hideDialog,
            isFullScreen: true,
            visible: this.state.visible
          }),
          React.createElement(
            IceFormBinderWrapper,
            {
              ref: function ref(_ref) {
                _this2.refForm = _ref;
              },
              value: this.state.value,
              onChange: this.onFormChange
            },
            React.createElement(
              'div',
              { style: styles.dialogContent },
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { span: '' + (isMobile ? '6' : '3') },
                  React.createElement(
                    'label',
                    { style: styles.formLabel },
                    '\u5173\u952E\u8BCD'
                  )
                ),
                React.createElement(
                  Col,
                  { span: '' + (isMobile ? '18' : '16') },
                  React.createElement(
                    IceFormBinder,
                    {
                      required: true,
                      min: 2,
                      max: 10,
                      message: '\u5F53\u524D\u5B57\u6BB5\u5FC5\u586B\uFF0C\u4E14\u6700\u5C11 2 \u4E2A\u5B57\u6700\u591A 10 \u4E2A\u5B57'
                    },
                    React.createElement(_Input, {
                      name: 'keywords',
                      style: styles.input,
                      placeholder: '\u591A\u5173\u952E\u8BCD\u7528\u82F1\u6587 , \u53F7\u5206\u5272'
                    })
                  ),
                  React.createElement(IceFormError, { name: 'keywords' })
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  null,
                  React.createElement(
                    IceFormBinder,
                    null,
                    React.createElement(RadioGroup, {
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
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  null,
                  React.createElement(
                    IceFormBinder,
                    null,
                    React.createElement(_Input, {
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
        ),
        React.createElement(
          _Button,
          { type: 'primary', onClick: this.showDialog },
          '\u663E\u793A Dialog'
        )
      );
    }
  }]);

  return SimpleFormDialog;
}(Component), _class.displayName = 'SimpleFormDialog', _temp);
export { SimpleFormDialog as default };


var styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' }
};