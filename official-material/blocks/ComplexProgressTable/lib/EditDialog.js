import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Dialog from '@icedesign/base/lib/dialog';
import _Range from '@icedesign/base/lib/range';
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

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError } from '@icedesign/form-binder';
import CreateFuncDialog from './CreateFuncDialog';

var Row = _Grid.Row,
    Col = _Grid.Col;
var RadioGroup = _Radio.Group;
var EditDialog = (_temp = _class = function (_Component) {
  _inherits(EditDialog, _Component);

  function EditDialog(props) {
    _classCallCheck(this, EditDialog);

    var _this = _possibleConstructorReturn(this, (EditDialog.__proto__ || _Object$getPrototypeOf(EditDialog)).call(this, props));

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
      value: props.value
    };
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(EditDialog, [{
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
      var _this2 = this;

      return React.createElement(
        _Dialog,
        _extends({
          style: styles.dialog,
          autoFocus: false,
          footerAlign: 'center',
          title: '\u4FEE\u6539\u9879\u76EE\u8FDB\u5EA6'
        }, this.props, {
          onOk: this.onOk,
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
                { span: '4' },
                React.createElement(
                  'label',
                  { style: styles.formLabel },
                  '\u9879\u76EE\u6807\u9898\uFF1A'
                )
              ),
              React.createElement(
                Col,
                { span: '16' },
                React.createElement(
                  IceFormBinder,
                  {
                    required: true,
                    min: 2,
                    max: 26,
                    message: '\u9879\u76EE\u6807\u9898\u5FC5\u586B\uFF0C\u4E14\u6700\u5C11 2 \u4E2A\u5B57\u6700\u591A 26 \u4E2A\u5B57'
                  },
                  React.createElement(_Input, {
                    name: 'title',
                    style: styles.input,
                    placeholder: '\u9879\u76EE\u6807\u9898'
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
                { span: '4' },
                React.createElement(
                  'label',
                  { style: styles.formLabel },
                  '\u9879\u76EE\u8FDB\u5EA6\uFF1A'
                )
              ),
              React.createElement(
                Col,
                { span: '16' },
                React.createElement(
                  'div',
                  { style: styles.progressWrapper },
                  React.createElement(
                    IceFormBinder,
                    { type: 'number' },
                    React.createElement(_Range, { name: 'progress', marks: [0, 100] })
                  )
                )
              )
            ),
            React.createElement(
              Row,
              { style: styles.formRow },
              React.createElement(
                Col,
                { span: '4' },
                React.createElement(
                  'label',
                  { style: styles.formLabel },
                  '\u4F18\u5148\u7EA7\uFF1A'
                )
              ),
              React.createElement(
                Col,
                { span: '16' },
                React.createElement(
                  IceFormBinder,
                  null,
                  React.createElement(RadioGroup, {
                    name: 'priority',
                    dataSource: [{
                      value: '高',
                      label: '高'
                    }, {
                      value: '中',
                      label: '中'
                    }, {
                      value: '低',
                      label: '低'
                    }]
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return EditDialog;
}(Component), _class.displayName = 'EditDialog', _temp);


var styles = {
  dialog: {
    width: '640px'
  },
  dialogContent: {},
  formRow: {
    marginTop: 20
  },
  input: {
    width: '100%'
  },
  progressWrapper: {
    marginTop: '10px'
  },
  formLabel: {
    lineHeight: '26px',
    textAlign: 'right',
    display: 'inline-block'
  }
};

export default CreateFuncDialog(EditDialog);