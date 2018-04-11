import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Select from '@icedesign/base/lib/select';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Switch from '@icedesign/base/lib/switch';
import _DatePicker from '@icedesign/base/lib/date-picker';
import _Radio from '@icedesign/base/lib/radio';
import _Checkbox from '@icedesign/base/lib/checkbox';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError } from '@icedesign/form-binder';
var Row = _Grid.Row,
    Col = _Grid.Col;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

var CheckboxGroup = _Checkbox.Group;
var RadioGroup = _Radio.Group;
var RangePicker = _DatePicker.RangePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换

var SwitchForForm = function SwitchForForm(props) {
  var checked = props.checked === undefined ? props.value : props.checked;

  return React.createElement(_Switch, _extends({}, props, {
    checked: checked,
    onChange: function onChange(currentChecked) {
      if (props.onChange) props.onChange(currentChecked);
    }
  }));
};

var CreateActivityForm = (_temp = _class = function (_Component) {
  _inherits(CreateActivityForm, _Component);

  function CreateActivityForm(props) {
    _classCallCheck(this, CreateActivityForm);

    var _this = _possibleConstructorReturn(this, (CreateActivityForm.__proto__ || _Object$getPrototypeOf(CreateActivityForm)).call(this, props));

    _this.onFormChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.reset = function () {
      _this.setState({
        value: {
          name: '',
          area: 'location1',
          time: [],
          delivery: false,
          type: ['地推活动'],
          resource: '线下场地免费',
          extra: ''
        }
      });
    };

    _this.submit = function () {
      _this.formRef.validateAll(function (error, value) {
        console.log('error', error, 'value', value);
        if (error) {}
        // 处理表单报错

        // 提交当前填写的数据
      });
    };

    _this.state = {
      value: {
        name: '',
        area: 'location1',
        time: [],
        delivery: false,
        type: ['地推活动'],
        resource: '线下场地免费',
        extra: ''
      }
    };
    return _this;
  }

  _createClass(CreateActivityForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'create-activity-form' },
        React.createElement(
          IceContainer,
          { title: '\u6D3B\u52A8\u53D1\u5E03', style: styles.container },
          React.createElement(
            IceFormBinderWrapper,
            {
              ref: function ref(formRef) {
                _this2.formRef = formRef;
              },
              value: this.state.value,
              onChange: this.onFormChange
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u6D3B\u52A8\u540D\u79F0\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    {
                      name: 'name',
                      required: true,
                      message: '\u6D3B\u52A8\u540D\u79F0\u5FC5\u987B\u586B\u5199'
                    },
                    React.createElement(_Input, { style: { width: '100%' } })
                  ),
                  React.createElement(IceFormError, { name: 'name' })
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u6D3B\u52A8\u533A\u57DF\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    { name: 'area' },
                    React.createElement(_Select, {
                      className: 'next-form-text-align',
                      dataSource: [{ label: '区域一', value: 'location1' }, { label: '区域二', value: 'location2' }]
                    })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u6D3B\u52A8\u65F6\u95F4\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    {
                      name: 'time',
                      type: 'array'
                      // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                      , valueFormatter: function valueFormatter(date, dateStr) {
                        return dateStr;
                      }
                    },
                    React.createElement(RangePicker, { showTime: true })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u5373\u65F6\u914D\u9001\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    { name: 'delivery' },
                    React.createElement(SwitchForForm, null)
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u6D3B\u52A8\u6027\u8D28\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    { name: 'type', type: 'array' },
                    React.createElement(CheckboxGroup, {
                      className: 'next-form-text-align',
                      dataSource: [{ label: '美食线上活动', value: '美食线上活动' }, { label: '地推活动', value: '地推活动' }, { label: '线下主题活动', value: '线下主题活动' }, { label: '单纯品牌曝光', value: '单纯品牌曝光' }]
                    })
                  ),
                  React.createElement(
                    'div',
                    null,
                    React.createElement(IceFormError, { name: 'type' })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formItem },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u7279\u6B8A\u8D44\u6E90\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    { name: 'resource' },
                    React.createElement(RadioGroup, {
                      className: 'next-form-text-align',
                      dataSource: [{ label: '线上品牌商赞助', value: '线上品牌商赞助' }, { label: '线下场地免费', value: '线下场地免费' }]
                    })
                  )
                )
              ),
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  '\u6D3B\u52A8\u5F62\u5F0F\uFF1A'
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    IceFormBinder,
                    { name: 'extra' },
                    React.createElement(_Input, { multiple: true, style: { width: '100%' } })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.btns },
                React.createElement(
                  Col,
                  { xxs: '6', s: '2', l: '2', style: styles.formLabel },
                  ' '
                ),
                React.createElement(
                  Col,
                  { s: '12', l: '10' },
                  React.createElement(
                    _Button,
                    { type: 'primary', onClick: this.submit },
                    '\u7ACB\u5373\u521B\u5EFA'
                  ),
                  React.createElement(
                    _Button,
                    { style: styles.resetBtn, onClick: this.reset },
                    '\u91CD\u7F6E'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return CreateActivityForm;
}(Component), _class.displayName = 'CreateActivityForm', _class.defaultProps = {}, _temp);
export { CreateActivityForm as default };


var styles = {
  container: {
    paddingBottom: 0
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px'
  },
  formLabel: {
    textAlign: 'right'
  },
  btns: {
    margin: '25px 0'
  },
  resetBtn: {
    marginLeft: '20px'
  }
};