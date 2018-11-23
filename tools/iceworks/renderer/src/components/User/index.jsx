import { Base64 } from 'js-base64';
import { Dialog } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import propTypes from 'prop-types';

import './index.scss';

@inject('user')
@observer
class User extends Component {
  static propTypes = {
    user: propTypes.object,
  };
  constructor(props) {
    super(props);

    let userValue = localStorage.getItem('login:user');
    let user = {};
    if (userValue) {
      try {
        user = JSON.parse(userValue);
      } catch (e) {}
    }

    this.props.user.data = user;
    this.webview = null;
  }

  handleClose = () => {
    this.props.user.close();
  };

  handleOpenLogin = () => {
    this.props.user.open();
  };

  bindWebview = (webview) => {
    if (webview) {
      this.webviewAddEvents(webview);
    } else {
      this.webviewRemoveEvents();
    }
  };

  webviewAddEvents = (webview) => {
    this.webview = webview;
    this.webview.addEventListener('did-finish-load', this.handleDidFinishLoad);
  };

  webviewRemoveEvents = () => {
    this.webview.removeEventListener(
      'did-finish-load',
      this.handleDidFinishLoad
    );
    this.webview = null;
  };

  handleDidFinishLoad = () => {
    console.log('login-page 加载完成');
    if (this.webview.src.indexOf('/iceworks-login') != -1) {
      let sessionCookies = this.webview.getWebContents().session.cookies;
      sessionCookies.get({}, (error, cookies) => {
        for (let i = 0, len = cookies.length; i < len; i++) {
          if (cookies[i].name == 'login_user') {
            // eslint-disable-next-line
            let userData = JSON.parse(Base64.decode(cookies[i].value));
            this.saveUser(userData);
            break;
          }
        }
      });
    }
  };

  saveUser = (data) => {
    localStorage.setItem('login:user', JSON.stringify(data));
    this.props.user.close();
    this.props.user.data = data;
  };

  handleWebviewIpcmsssage = ({ channel, args }) => {
    if (channel == 'login-success') {
      const user = args[0];
      localStorage.setItem('login:user', JSON.stringify(user));
      this.props.user.close();
      this.props.user.data = user;
    }
  };

  render() {
    const data = this.props.user.data;
    return (
      <div className="user-wrapper">
        <div
          className="user-info"
          style={{
            cursor: 'pointer',
          }}
          onClick={this.handleOpenLogin}
        >
          <div className="user-avater">
            {data.avatar_url ? (
              <img src={data.avatar_url} />
            ) : (
              <img src={require('../../static/avatar.jpg')} />
            )}
          </div>
          <div className="user-name">{data.name || '请登录'}</div>
        </div>

        <Dialog
          className="fullscreen-dialog"
          visible={this.props.user.visible}
          onClose={this.handleClose}
          title="账号登录"
          footer={false}
        >
          <div
            style={{
              height: 'calc(100vh - 160px)',
              width: 'calc(100vw - 160px)',
            }}
          >
            <webview
              id="webview"
              disablewebsecurity="true"
              ref={this.bindWebview}
              src="http://ice.alibaba-inc.com/iceworks-login"
              httpreferrer="http://ice.alibaba-inc.com"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default User;
