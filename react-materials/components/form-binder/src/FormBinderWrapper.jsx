'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import schema from 'async-validator';

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
     * 当前表单元素变更时触发
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: undefined,
    scrollErrorFieldTopOffset: 37.5,
    enableScrollErrorField: true,
    onChange: () => {},
  };

  static childContextTypes = {
    getter: PropTypes.func,
    getError: PropTypes.func,
    addValidate: PropTypes.func,
    removeValidate: PropTypes.func,
    setter: PropTypes.func,
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

    // all rules cache
    this.validateRules = {};
    // scroll to the position when error happened
    this.validateRefs = {};

    this.state = {
      formErrors: [],
      value: props.value || {},
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

  getter = (path) => {
    const value = this.state.value;
    // from happy getter https://github.com/happy-codes/happy-getter/blob/master/src/index.js
    const pathArr = path.split(REG_KEY).filter((item) => !!item);
    const result = pathArr.reduce(
      (result, currentPath, currentIndex) => {
        if (!result.errorPath) {
          // get value
          let key = currentPath.replace(/[\'\"]/gi, '');
          result.value = result.value[key];

          // check value
          if (currentIndex !== pathArr.length - 1) {
            // can not get the next value
            const currentValueType = Object.prototype.toString.call(
              result.value
            );
            if (/String|Number|Boolean|Null|Undefined/.test(currentValueType)) {
              result.errorPath = currentPath;
            }
          }
        }

        return result;
      },
      { value, errorPath: null }
    );

    return result.value;
  };

  setter = (path, newValue) => {
    let value = this.state.value;
    const pathArr = path.split(REG_KEY).filter((item) => !!item);

    pathArr.reduce((pointer, currentPath, currentIndex) => {
      if (pathArr.length === currentIndex + 1) {
        // last one
        pointer[currentPath] = newValue;
      }
      return pointer[currentPath];
    }, value);

    // state already update
    this.setState({}, () => {
      this.props.onChange && this.props.onChange(this.state.value);
    });
  };

  validate = (path, rules = []) => {
    let validator = new schema({ [path]: rules });

    validator.validate({ [path]: this.getter(path) }, (errors) => {
      if (errors && errors.length > 0) {
        this.setState((state) => {
          let formErrors = state.formErrors;
          formErrors = formErrors.filter(
            (error) => error.field !== errors[0].field
          );
          Array.prototype.push.apply(formErrors, errors);
          return { formErrors: formErrors };
        });
      } else {
        this.setState({
          formErrors: this.state.formErrors.filter(
            (error) => error.field !== path
          ),
        });
      }

      validator = null;
    });
  };

  validateAll = (cb) => {
    let validator = new schema(this.validateRules);
    let needValidateValues = {};
    Object.keys(this.validateRules).forEach((path) => {
      needValidateValues[path] = this.getter(path);
    });
    validator.validate(needValidateValues, (errors) => {
      if (cb && typeof cb === 'function') {
        cb(errors, this.state.value);
      }

      if (this.props.enableScrollErrorField && errors && errors.length > 0) {
        // todo 默认定位到第一个，最好有报错动效
        this.validateRefs[errors[0].field].scrollIntoView &&
          this.validateRefs[errors[0].field].scrollIntoView();
        window.scroll(
          window.scrollX,
          window.scrollY - this.props.scrollErrorFieldTopOffset
        );
      }

      if (errors) {
        this.setState({formErrors: errors});
      } else {
        this.setState({formErrors: []});
      }
    });
  };

  getError = (path) => {
    const formErrors = this.state.formErrors;
    if (!formErrors.length) {
      return [];
    }
    return formErrors.filter((error) => {
      return error.field === path;
    });
  };

  render() {
    return React.Children.only(this.props.children);
  }
}
