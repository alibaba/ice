import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Input, Button } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
  FormError
} from '@icedesign/form-binder';

import './Subscribe.scss';

export default class Subscribe extends Component {
  static displayName = 'Subscribe';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: ''
      }
    };
  }

  formChange = newValue => {
    this.setState({
      formValue: newValue
    });
  };

  subscribe = () => {
    this.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div className="subscribe" style={styles.subscribe}>
        <IceCard style={styles.container}>
          <h1 style={styles.title}>订阅</h1>
          <FormBinderWrapper
            ref={form => {
              this.form = form;
            }}
            value={this.state.formValue}
            onChange={this.formChange}
          >
            <div>
              <div style={styles.center}>
                <FormBinder type="email" message="邮箱不合法" required>
                  <Input
                    size="large"
                    name="email"
                    placeholder="请输入您的订阅邮箱..."
                    style={styles.input}
                  />
                </FormBinder>
                <Button size="large" type="primary" onClick={this.subscribe}>
                  订阅
                </Button>
              </div>
              <div style={styles.error}>
                <FormError name="email" />
              </div>
            </div>
          </FormBinderWrapper>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '48px 0'
  },
  title: {
    fontSize: '26px',
    color: '#000',
    textAlign: 'center',
    margin: '0'
  },
  input: {
    width: '400px',
    marginRight: '15px'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20px'
  },
  error: {
    paddingLeft: '240px',
    marginTop: '5px'
  },
  subscribe: {}
};
