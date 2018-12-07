/* eslint new-cap:0, no-unused-expressions:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import schema from 'async-validator';
import { getParams } from './utils';

const REG_KEY = /\[(['"a-z_A-Z0-9]*)\]|\./gi;

export default class IceFormBinderWrapper extends Component {
  static displayName = 'IceFormBinderWrapper';

  static propTypes = {
    /**
     * 全局校验滚动到报错位置时，距离顶部的偏移值（适用于头部 fixed 的场景）
     */
    scrollErrorFieldTopOffset: PropTypes.number,
    /**
     * 全局校验时，是否开启滚动到报错表单位置
     */
    enableScrollErrorField: PropTypes.bool,
    /**
     * 当前表单的根 value 数据
     */
    value: PropTypes.object,
    /**
     * 当前表单元素变更时触发 */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: {},
    scrollErrorFieldTopOffset: 0,
    enableScrollErrorField: false,
    onChange: () => {},
  };

  static childContextTypes = {
    getter: PropTypes.func,
    setter: PropTypes.func,
    getError: PropTypes.func,
    addValidate: PropTypes.func,
    removeValidate: PropTypes.func,
    validate: PropTypes.func,
  };

  getChildContext() {
    return {
      getter: this.getter,
      setter: this.setter,
      addValidate: this.addValidate,
      removeValidate: this.removeValidate,
      getError: this.getError,
      validate: this.validate,
    };
  }

  constructor(props) {
    super(props);

    this.validateRules = {};

    this.validateRefs = {};

    this.state = {
      value: props.value || {},
      errors: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || {},
      });
    }
  }

  addValidate = (path, rules, fieldDOM) => {
    this.validateRules[path] = rules;
    this.validateRefs[path] = fieldDOM;
  };

  removeValidate = (path) => {
    delete this.validateRules[path];
    delete this.validateRefs[path];
  };

  getter = (name) => {
    if (!name) {
      throw new Error(
        'The name attribute is required in <FormBinder> component'
      );
    }
    const { value } = this.state;
    const arr = name.split(REG_KEY).filter((item) => !!item);
    const result = arr.reduce(
      (prev, curr, currIndex) => {
        if (!prev.errorName) {
          const key = curr.replace(/[\'\"]/gi, '');
          prev.value = prev.value[key];
          if (currIndex !== arr.length - 1) {
            const currentValueType = Object.prototype.toString.call(prev.value);
            if (/String|Number|Boolean|Null|Undefined/.test(currentValueType)) {
              prev.errorName = curr;
            }
          }
        }

        return prev;
      },
      { value, errorName: null }
    );

    return result.value;
  };

  setter = (name, newValue) => {
    const { value } = this.state;
    const arr = name.split(REG_KEY).filter((item) => !!item);

    arr.reduce((prev, curr, currentIndex) => {
      if (arr.length === currentIndex + 1) {
        prev[curr] = newValue;
      }

      return prev[curr];
    }, value);

    this.setState({}, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };

  validate = (name, rules = []) => {
    const validator = new schema({ [name]: rules });

    validator.validate({ [name]: this.getter(name) }, (errors) => {
      if (errors && errors.length > 0) {
        this.setState((state) => {
          const formErrors = state.errors.filter(
            (error) => error.field !== errors[0].field
          );
          Array.prototype.push.apply(formErrors, errors);
          return { errors: formErrors };
        });
      } else {
        this.setState({
          errors: this.state.errors.filter((error) => error.field !== name),
        });
      }
    });
  };

  validateAll = (cb) => {
    this.validateFields(cb);
  };

  validateFields = (ns, opt, cb) => {
    const { names, callback, options } = getParams(ns, opt, cb);
    const needValidateValues = {};

    let needValidateRules = {};
    if (Array.isArray(names)) {
      Object.keys(this.validateRules).forEach((name) => {
        if (names.includes(name)) {
          needValidateRules[name] = this.validateRules[name];
        }
      });
    } else {
      needValidateRules = this.validateRules;
    }

    Object.keys(needValidateRules).forEach((name) => {
      needValidateValues[name] = this.getter(name);
    });

    // 当数据不符合校验规则时，在 validator.validate 的回调函数中，就可以得到相应的错误信息
    // https://github.com/yiminghe/async-validator#usage
    const validator = new schema(needValidateRules);
    validator.validate(needValidateValues, (errors) => {
      // 校验时的回调
      if (callback && typeof callback === 'function') {
        callback(errors, this.state.value);
      }

      // 报错后滚动到对应的错误位置
      if (this.props.enableScrollErrorField && errors && errors.length > 0) {
        // todo 默认定位到第一个，最好有报错动效
        this.validateRefs[errors[0].field].scrollIntoView &&
          this.validateRefs[errors[0].field].scrollIntoView();
        window.scroll(
          window.scrollX,
          window.scrollY - this.props.scrollErrorFieldTopOffset
        );
      }

      // 表单域错误处理
      if (errors) {
        this.setState({ errors });
      } else {
        this.setState({ errors: [] });
      }
    });
  };

  getError = (path) => {
    const { errors } = this.state;
    if (!errors.length) {
      return [];
    }
    return errors.filter((error) => {
      return error.field === path;
    });
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
