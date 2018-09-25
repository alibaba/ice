'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// default return the first value
const defaultValueFormatter = (...args) => {
  return args[0];
};

// default return the first value
const defaultValueTransformer = (value) => {
  return value;
};

const defaultErrorStatePropsGenerator = (errors, FormItemProps) => {
  return {
    className: FormItemProps.className
      ? FormItemProps.className + ' this-field-has-error'
      : 'this-field-has-error',
  };
};

export default class FormBinder extends Component {
  static displayName = 'FormBinder';

  static propTypes = {
    /**
     * 当前表单绑定的数据层级
     */
    name: PropTypes.string,
    /**
     * 当表单报错的时候，你可能要对报错的表单组件上面添加特殊的 props（比如报错的 className、style 等），此时就可以通过这个 function 来自定义返回的报错状态 props
     */
    errorStatePropsGenerator: PropTypes.func,
    /**
     * 数据格式化方法，表单组件 onChange 之后，支持对数据做一层转换再进行后续操作
     */
    valueFormatter: PropTypes.func,
    /**
     * 数据转换方法，表单组件接收值时可将其转换为其他类型
     */
    valueTransformer: PropTypes.func,
    /**
     * 触发校验的事件，对于高频触发校验的 Input 可以设置为 'onBlur' 减少校验调用次数
     */
    triggerType: PropTypes.string,
    /**
     * value 属性的 key, 默认 `value`
     */
    valueKey: PropTypes.string,
    /**
     * 当前表单项是否必须有值
     */
    required: PropTypes.bool,
    /**
     * 当前表单值正则表单校验
     */
    pattern: PropTypes.object,
    /**
     * 当前表单值最小数（对字符串、数组、数值类型数据有效）
     */
    min: PropTypes.number,
    /**
     * 当前表单值最大数（对字符串、数组、数值类型数据有效）
     */
    max: PropTypes.number,
    /**
     * 当前表单值固定长度（对字符串、数组、数值类型数据有效）
     */
    len: PropTypes.number,
    /**
     * 当前表单值枚举值
     */
    enum: PropTypes.array,
    /**
     * 当前表单值是否允许纯空格（对字符串类型有效）
     */
    whitespace: PropTypes.bool,
    /**
     * 声明当前表单项下层表单数据校验规则
     */
    fields: PropTypes.object,
    /**
     * 当前表单值校验前的自定义数据转换方法
     */
    transform: PropTypes.func,
    /**
     * 当前表单校验规则失败时的提示文案
     */
    message: PropTypes.node,
    /**
     * 自定义表单校验方法，支持异步请求等校验
     */
    validator: PropTypes.func,
    /**
     * 当前表单值的数据类型，支持配置 string、number、boolean、method、regexp、integer、float、array、object、enum、date、url、hex、email
     */
    type: PropTypes.string,
    /**
     * 数组的方式配置当前表单校验规则，用于对一个表单执行多条校验规则
     */
    rules: PropTypes.array,
  };

  // due to the props getter logic in render, do not add default value here.
  static defaultProps = {};

  static contextTypes = {
    getError: PropTypes.func,
    getter: PropTypes.func,
    validate: PropTypes.func,
    addValidate: PropTypes.func,
    removeValidate: PropTypes.func,
    setter: PropTypes.func,
  };

  currentRules = [];

  componentDidMount() {
    this.currentRules = this.getFormRules(this.props);
    // this form item need validate
    if (this.currentRules.length) {
      const FormItem = React.Children.only(this.props.children);
      const currentName = this.props.name || FormItem.props.name;

      this.context.addValidate(
        currentName,
        this.currentRules,
        ReactDOM.findDOMNode(this)
      );
    }
  }

  componentWillUnmount() {
    this.currentRules = this.getFormRules(this.props);
    // this form item need validate
    if (this.currentRules.length) {
      const FormItem = React.Children.only(this.props.children);
      const currentName = this.props.name || FormItem.props.name;

      this.context.removeValidate(currentName);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextRules = this.getFormRules(nextProps);
    // this form item need validate
    if (
      nextRules.length > 0 &&
      JSON.stringify(nextRules) !== JSON.stringify(this.currentRules)
    ) {
      this.currentRules = nextRules;

      const FormItem = React.Children.only(this.props.children);
      const currentName = this.props.name || FormItem.props.name;

      this.context.addValidate(
        currentName,
        this.currentRules,
        ReactDOM.findDOMNode(this)
      );
    }
  }

  // get form rules from props
  getFormRules = (props) => {
    const FormItem = React.Children.only(props.children);
    const FormItemProps = FormItem.props;

    // rules has higher priority
    const rules = props.rules || FormItemProps.rules;
    if (rules) {
      return rules;
    }

    let result = [];
    const ruleKeys = [
      'required',
      'pattern',
      'min',
      'max',
      'len',
      'enum',
      'whitespace',
      'fields',
      'transform',
      'message',
      'validator',
      'type',
    ];
    ruleKeys.forEach((ruleKey) => {
      const ruleValue =
        ruleKey in props
          ? props[ruleKey]
          : ruleKey in FormItemProps ? FormItemProps[ruleKey] : undefined;
      if (ruleValue !== undefined && ruleValue !== null) {
        result[0]
          ? (result[0][ruleKey] = ruleValue)
          : result.push({
              [ruleKey]: ruleValue,
            });
      }
    });

    return result;
  };

  render() {
    const FormItem = React.Children.only(this.props.children);
    const FormItemProps = FormItem.props;
    const FormItemDefaultProps = FormItem.type.defaultProps || {};

    const currentName = this.props.name || FormItem.props.name;
    const valueKey = this.props.valueKey || 'value';

    // handle form field error
    let formValueErrorProps = {};
    const errors = this.context.getError(currentName);
    if (errors.length !== 0) {
      const errorStatePropsGenerator =
        this.props.errorStatePropsGenerator ||
        FormItem.props.errorStatePropsGenerator ||
        defaultErrorStatePropsGenerator;

      formValueErrorProps = errorStatePropsGenerator(errors, FormItemProps);
    }

    const currentValidateTriggerType =
      this.props.triggerType || FormItemProps.triggerType || 'onChange';

    // handle value format
    const valueFormatter =
      this.props.valueFormatter ||
      FormItem.props.valueFormatter ||
      defaultValueFormatter;

    // handle value transform
    const valueTransformer =
      this.props.valueTransformer ||
      FormItem.props.valueTransformer ||
      defaultValueTransformer;

    const NewFormItem = React.cloneElement(FormItem, {
      ...formValueErrorProps,
      [currentValidateTriggerType]: () => {
        FormItemProps[currentValidateTriggerType] &&
          FormItemProps[currentValidateTriggerType]();

        if (
          currentValidateTriggerType !== 'onChange' &&
          this.currentRules.length > 0
        ) {
          this.context.validate(currentName, this.currentRules);
        }
      },
      // sync invoke onChange on formItems
      onChange: (...args) => {
        FormItemProps.onChange && FormItemProps.onChange.apply(this, args);
        this.context.setter(currentName, valueFormatter(...args));
        if (
          currentValidateTriggerType === 'onChange' &&
          this.currentRules.length > 0
        ) {
          this.context.validate(currentName, this.currentRules);
        }
      },
      [valueKey]: (() => {
        const formItemValue = FormItemProps[valueKey];
        if (formItemValue && formItemValue !== FormItemDefaultProps[valueKey] ) {
          return valueTransformer(FormItemProps[valueKey]);
        } else {
          const value = this.context.getter(currentName);
          return valueTransformer(value);
        }
      })(),
    });

    return NewFormItem;
  }
}
