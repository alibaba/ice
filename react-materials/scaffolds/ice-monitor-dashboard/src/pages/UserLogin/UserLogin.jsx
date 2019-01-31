/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message, Grid, Icon, Form } from '@alifd/next';

const FormItem = Form.Item;
const { Row, Col } = Grid;

@withRouter
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
    console.log(values);
    Message.success('登录成功');
    this.props.history.push('/');
  };


  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <Form
            value={this.state.value}
            onChange={this.formChange}
            size="large"
          >
            <FormItem required requiredMessage="必填">
              <Input
                innerBefore={<Icon
                  type="account"
                  size="small"
                  style={styles.inputIcon}
                />}
                name="username" size="large" maxLength={20} placeholder="用户名" />
            </FormItem>
            <FormItem required requiredMessage="必填">
              <Input
                innerBefore={<Icon
                  type="account"
                  size="small"
                  todo="lock"
                  style={styles.inputIcon}
                />}
                name="password"
                size="large"
                htmlType="password"
                placeholder="密码" />
            </FormItem>
            <FormItem>
              <Checkbox name="checkbox" className="checkbox">记住账号</Checkbox>
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
            </Row>

            <Row className="tips">
              <Link to="/user/register" className="tips-text">
                立即注册
                </Link>
            </Row>
          </Form>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '10px',
    top: '8px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserLogin;
