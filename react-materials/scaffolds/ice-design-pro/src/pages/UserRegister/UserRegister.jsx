/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Grid, Form } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FoundationSymbol from '@icedesign/foundation-symbol';
import injectReducer from '../../utils/injectReducer';
import { userRegister } from './action';
import reducer from './reducer';

const Icon = FoundationSymbol;
const { Row } = Grid;
const FormItem = Form.Item;

@withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    this.props.userRegister(values);
  };

  render() {
    return (
      <div className="user-register">
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem
              required
              requiredMessage="请输入正确的用户名"
              className="formItem"
            >
              <Input
                innerBefore={
                  <Icon type="person" size="small" className="inputIcon" />
                }
                name="name"
                maxLength={20}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem
              required
              requiredMessage="请输入正确的邮箱"
              className="formItem"
            >
              <Input
                innerBefore={
                  <Icon type="mail" size="small" className="inputIcon" />
                }
                name="email"
                maxLength={20}
                placeholder="邮箱"
              />
            </FormItem>
            <FormItem
              required
              requiredMessage="请输入正确的密码"
              className="formItem"
            >
              <Input
                innerBefore={
                  <Icon
                    type="lock"
                    size="small"
                    todo="lock"
                    className="inputIcon"
                  />
                }
                name="passwd"
                htmlType="password"
                placeholder="至少8位密码"
              />
            </FormItem>

            <FormItem
              required
              validator={(rule, values, callback) =>
                this.checkPasswd2(rule, values, callback, this.state.value)
              }
              className="formItem"
            >
              <Input
                innerBefore={
                  <Icon
                    type="lock"
                    size="small"
                    todo="lock"
                    className="inputIcon"
                  />
                }
                name="rePasswd"
                htmlType="password"
                placeholder="至少8位密码"
              />
            </FormItem>
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                注 册
              </Form.Submit>
            </Row>

            <Row className="tips">
              <Link to="/user/login" className="tips-text">
                使用已有账户登录
              </Link>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { userRegister };

const mapStateToProps = (state) => {
  return { registerResult: state.register };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'register', reducer });

export default compose(
  withReducer,
  withConnect
)(UserRegister);
