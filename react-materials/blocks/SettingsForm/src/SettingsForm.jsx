/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid, Form } from '@alifd/next';
import './SettingsForm.scss';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 6, s: 3, l: 3 },
  wrapperCol: { s: 12, l: 10 }
};


function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        gender: 'male',
        notice: false,
        email: '',
        avatar: [],
        siteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        description: '',
      },
    };
  }

  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
    } else {
      // 处理表单报错
    }
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>基本设置</h2>

              <FormItem size="large" label="姓名：" {...formItemLayout} required maxLength={10} requiredMessage="必填">
                <Input name="name" placeholder="于江水" />
              </FormItem>
              <FormItem label="头像：" {...formItemLayout} required requiredMessage="必填">
                <Upload.Card
                  name="avatar"
                  listType="card"
                  action=""
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  onSuccess={onSuccess}
                  onError={onError}
                />

              </FormItem>
              <FormItem label="性别：" {...formItemLayout} required requiredMessage="必填">
                <RadioGroup name="gender" >
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="通知：" {...formItemLayout}  >
                <Switch name="notice"/>
              </FormItem>
              <FormItem size="large" label="邮件：" {...formItemLayout} required requiredMessage="请输入正确的邮件">
                <Input
                  htmlType="email"
                  name="email"
                />
              </FormItem>
              <FormItem size="large" label="网站地址：" {...formItemLayout} required formatMessage="请输入正确的网站地址" format="url">
                <Input
                  name="siteUrl"
                  type="url"
                  placeholder="https://alibaba.github.io/ice"
                />
              </FormItem>

              <FormItem size="large" label="Github：" {...formItemLayout} required formatMessage="请输入正确的 Github 地址" format="url">
                <Input
                  type="url"
                  name="githubUrl"
                  placeholder="https://github.com/alibaba/ice"
                />
              </FormItem>

              <FormItem size="large" label="Twitter：" {...formItemLayout} required formatMessage="请输入正确的 Twitter 地址" format="url">
                <Input name="twitterUrl" placeholder="https://twitter.com" />
              </FormItem>

              <FormItem size="large" label="自我描述：" {...formItemLayout} >
                <Input.TextArea placeholder="请输入描述..." />
              </FormItem>
              <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Form.Submit
                size="large"
                type="primary"
                style={{ width: 100 }}
                validate
                onClick={this.validateAllFormField}
              >
                提 交
              </Form.Submit>
            </Col>
          </Row>
            </div>
          </Form>


        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
