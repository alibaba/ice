import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Grid, Input, Button, Form } from '@alifd/next';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 5, s: 5, l: 7 },
  wrapperCol: { s: 14, l: 12 }
};


export default class SimpleFluencyForm extends Component {
  static displayName = 'SimpleFluencyForm';

  state = {
    step: 0
  }

  formChange = (values, field) => {
    console.log(values, field)
  }

  nextStep = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      this.setState({ step: this.state.step + 1 });
    } else {
      // 处理表单报错
    }
  };

  renderStep = (step) => {
    if (step === 0) {
      return (
        <IceContainer style={styles.form}>
          <Form onChange={this.formChange} >
            <FormItem label="姓名：" {...formItemLayout} required requiredMessage="必填项" >
              <Input name="username" autoComplete="on" />
            </FormItem>
            <FormItem label="邮箱：" {...formItemLayout} required formatMessage="邮箱不合法" format="email">
              <Input name="email" htmlType="email" autoComplete="on" />
            </FormItem>
            <FormItem label="电话：" {...formItemLayout} required formatMessage="请输入合法的电话号码" format="tel">
              <Input name="phone" />
            </FormItem>
            <FormItem label="地址：" {...formItemLayout} required requiredMessage="必填" >
              <Input.TextArea name="address" />
            </FormItem>
            <FormItem {...formItemLayout} label=" ">
              <Form.Submit onClick={this.nextStep} validate type="primary">下一步</Form.Submit>
            </FormItem>
          </Form>
        </IceContainer>
      );
    } else if (step === 1) {
      return (
        <IceContainer>
          <div>步骤二</div>
          <Button onClick={this.nextStep} type="primary">下一步</Button>
        </IceContainer>
      );
    } else if (step === 2) {
      return (
        <IceContainer>
          <div>步骤三</div>
          
          <Button onClick={this.nextStep} type="primary">下一步</Button>
        </IceContainer>
      );
    }
  };

  render() {
    return (
      <div className="simple-fluency-form">
        <IceContainer>
          <Step current={this.state.step} shape="dot">
            <Step.Item key={0} title="填写信息" />
            <Step.Item key={1} title="确认信息" />
            <Step.Item key={2} title="完成" />
          </Step>
        </IceContainer>
        {this.renderStep(this.state.step)}
      </div>
    );
  }
}

const styles = {
  form: {
    padding: '40px 20px',
  },
  formLabel: {
    textAlign: 'right',
    lineHeight: '1.7rem',
    paddingRight: '10px',
  },
  formRow: {
    marginBottom: '20px',
  },
  formErrorWrapper: {
    marginTop: '5px',
  },
  simpleFluencyForm: {},
};
