/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Checkbox, Grid, Form } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import { userLogin } from './actions';
import reducer from './reducer';

const Icon = FoundationSymbol;
const { Row } = Grid;
const FormItem = Form.Item;

class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
    };
  }

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
    this.props.userLogin(values);
  };

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="person" size="small" className="inputIcon" />
                }
                name="username"
                maxLength={20}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="lock" size="small" className="inputIcon" />
                }
                name="password"
                htmlType="password"
                placeholder="密码"
              />
            </FormItem>
            <FormItem>
              <Checkbox name="checkbox" className="checkbox">
                记住账号
              </Checkbox>
            </FormItem>
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                登 录
              </Form.Submit>
              <p className="account">
                <span className="tips-text" style={{ marginRight: '20px' }}>
                  管理员登录：admin/admin
                </span>
                <span className="tips-text">用户登录：user/user</span>
              </p>
            </Row>

            <Row className="tips">
              <Link to="/user/register" className="tips-text">
                立即注册
              </Link>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(UserLogin);
