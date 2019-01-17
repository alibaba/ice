/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Grid, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      Message.success('登录成功');
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className="formContainer">
        <h4 className="formTitle">登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div className="formItems">
            <Row className="formItem">
              <Col className="formItemCol">
                <IceIcon type="person" size="small" className="inputIcon" />
                <IceFormBinder name="username" required message="必填">
                  <Input className="next-input-single" size="large" maxLength={20} placeholder="用户名" />
                </IceFormBinder>
              </Col>
              <Col>
                <IceFormError name="username" />
              </Col>
            </Row>

            <Row className="formItem">
              <Col className="formItemCol">
                <IceIcon type="lock" size="small" className="inputIcon" />
                <IceFormBinder name="password" required message="必填">
                  <Input className="next-input-single" size="large" htmlType="password" placeholder="密码" />
                </IceFormBinder>
              </Col>
              <Col>
                <IceFormError name="password" />
              </Col>
            </Row>

            <Row className="formItem">
              <Col>
                <IceFormBinder name="checkbox">
                  <Checkbox className="checkbox">记住账号</Checkbox>
                </IceFormBinder>
              </Col>
            </Row>

            <Row className="formItem">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                登 录
              </Button>
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
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

export default UserLogin;
