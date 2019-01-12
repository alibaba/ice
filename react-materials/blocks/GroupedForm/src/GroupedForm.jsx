import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select, Checkbox, Form, NumberPicker, SplitButton } from '@alifd/next';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 8, s: 3, l: 3 },
  wrapperCol: { s: 12, l: 10 }
};

export default class GroupedForm extends Component {
  static displayName = 'GroupedForm';

  reset = () => {
  }

  formChange = (values, field) => {
    console.log(values, field)
  }

  submit = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
    } else {
      // 处理表单报错
    }
  };

  render() {
    return (
      <div className="grouped-form">
        <IceContainer title="商品发布" style={styles.container}>
          <Form onChange={this.formChange}>
            <div>
              <div style={styles.subForm}>
                <h3 style={styles.formTitle}>商品信息</h3>
                <div>
                  <FormItem label="宝贝标题：" {...formItemLayout} required requiredMessage="宝贝标题必须填写">
                    <Input name="title" placeholder="请输入宝贝标题" message="宝贝标题必须填写" />
                  </FormItem>
                  <FormItem label="商品类型：" {...formItemLayout} required requiredMessage="请选择商品类型">
                    <Select
                      name="type"
                      style={{ width: '30%' }}
                      dataSource={[
                        { label: '全新', value: 'new' },
                        { label: '二手', value: 'secondhand' },
                      ]}
                    />
                  </FormItem>
                  <FormItem label="宝贝价格：" {...formItemLayout} required requiredMessage="宝贝价格必须填写">
                  <NumberPicker
                      style={{ width: 120 }}
                      name="price"
                      placeholder="请输入宝贝价格"
                    />
                  </FormItem>
                  <FormItem label="宝贝描述：" {...formItemLayout} >
                    <Input.TextArea name="desc" />
                  </FormItem>
                </div>
              </div>

              <div style={styles.subForm}>
                <h3 style={styles.formTitle}>物流服务</h3>
                <div>
                  <FormItem label="物流公司：" {...formItemLayout} required requiredMessage="请选择物流公司">
                    <CheckboxGroup
                      name="deliveryType"
                      dataSource={[
                        { label: '顺丰', value: 'shunfeng' },
                        { label: '百世汇通', value: 'baishi' },
                      ]}
                    />
                  </FormItem>
                  <FormItem label="配送费用：" {...formItemLayout} required requiredMessage="请选择物流公司">
                    <NumberPicker
                      style={{ width: 120 }}
                      name="deliveryFee"
                      placeholder="请输入配送费用"
                    />
                  </FormItem>
                </div>
              </div>

              <FormItem label=" " {...formItemLayout}>
                <Form.Submit type="primary" validate onClick={this.submit}>
                  立即创建
                  </Form.Submit>
                <Form.Reset style={styles.resetBtn} onClick={this.reset}>
                  重置
                  </Form.Reset>
              </FormItem>
            </div>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  subForm: {
    marginBottom: '20px',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
