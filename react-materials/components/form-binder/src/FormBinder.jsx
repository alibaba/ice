/* eslint react/require-default-props:0, react/no-unused-prop-types:0, react/no-find-dom-node:0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const defaultSetFieldValue = (...args) => {
  return args[0];
};

const defaultGetFieldValue = (value) => {
  return value;
};

export default class FormBinder extends Component {
  static displayName = 'FormBinder';

  static propTypes = {
    /**
     * 当前表单绑定的数据层级
     */
    name: PropTypes.string,
    /**
     * 数据格式化方法，表单组件 onChange 之后，支持对数据做一层转换再进行后续操作
     */
    setFieldValue: PropTypes.func,
    /**
     * 数据转换方法，表单组件接收值时可将其转换为其他类型
     */
    getFieldValue: PropTypes.func,
    /**
     * 触发校验的事件，对于高频触发校验的 Input 可以设置为 'onBlur' 减少校验调用次数
     */
    triggerType: PropTypes.string,
    /**
     * value 属性的 key, 默认 `value`
     */
    valuePropName: PropTypes.string,
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

  static defaultProps = {};

  static contextTypes = {
    setter: PropTypes.func,
    getter: PropTypes.func,
    validate: PropTypes.func,
    addValidate: PropTypes.func,
    removeValidate: PropTypes.func,
    getError: PropTypes.func,
  };

  rules = [];

  componentDidMount() {
    this.rules = this.getRules(this.props);
    if (this.rules.length) {
      this.context.addValidate(
        this.props.name,
        this.rules,
        ReactDOM.findDOMNode(this)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextRules = this.getRules(nextProps);
    if (
      nextRules.length > 0 &&
      JSON.stringify(nextRules) !== JSON.stringify(this.rules)
    ) {
      this.rules = nextRules;
      this.context.addValidate(
        this.props.name,
        this.rules,
        ReactDOM.findDOMNode(this)
      );
    }
  }

  componentWillUnmount() {
    this.rules = this.getRules(this.props);
    if (this.rules.length) {
      this.context.removeValidate(this.props.name);
    }
  }

  /**
   * 从 FormBinder 收集表单的校验规则
   */
  getRules = (props) => {
    // rules 优先级最高
    if (props.rules && Array.isArray(props.rules)) {
      return props.rules;
    }

    const rules = []; // [{required: true, max: 10, ...}]
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
      'range',
    ];

    ruleKeys.forEach((ruleKey) => {
      let ruleValue;
      if (ruleKey in props) {
        ruleValue = props[ruleKey];
      }

      if (ruleValue !== undefined && ruleValue !== null) {
        if (rules[0]) {
          rules[0][ruleKey] = ruleValue;
        } else {
          rules.push({ [ruleKey]: ruleValue });
        }
      }
    });

    return rules;
  };

  render() {
    const FormItem = React.Children.only(this.props.children);
    const FormItemProps = FormItem.props;
    const name = this.props.name;

    // 提供受控属性 value 或其它与 valuePropName 的值同名的属性，如 Switch 的是 'checked'
    const valuePropName = this.props.valuePropName || 'value';

    // 自定义验证触发时机
    const validateTriggerType = this.props.triggerType || 'onChange';

    // 设置单个表单域的值
    const setFieldValue = this.props.setFieldValue || defaultSetFieldValue;

    // 获取单个表单域的值
    const getFieldValue = this.props.getFieldValue || defaultGetFieldValue;

    const NewFormItem = React.cloneElement(FormItem, {
      [valuePropName]: (() => {
        const value = this.context.getter(name);
        return setFieldValue(value);
      })(),

      [validateTriggerType]: () => {
        if (this.rules.length > 0) {
          this.context.validate(name, this.rules);
        }
      },

      onChange: (...args) => {
        if (FormItemProps.onChange) {
          FormItemProps.onChange.apply(this, args);
        }

        const newValue = getFieldValue(...args);
        this.context.setter(name, newValue);

        if (validateTriggerType === 'onChange' && this.rules.length > 0) {
          this.context.validate(name, this.rules);
        }
      },
    });

    return NewFormItem;
  }
}
