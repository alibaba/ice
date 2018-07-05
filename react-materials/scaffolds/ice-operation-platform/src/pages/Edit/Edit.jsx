import React, { Component } from 'react';
import Container from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Field,
  Select,
  Grid,
  Feedback,
  Dialog,
  Breadcrumb,
} from '@icedesign/base';
import './Edit.scss';

const { toast: Toast } = Feedback;
const { Col, Row } = Grid;
const clsPrefix = 'edit';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 1, span: 8 },
};

const versionDataSource = [{
  label: '1.0',
  value: '1.0',
}, {
  label: '2.0',
  value: '2.0',
}];

@withRouter
export default class NewInstance extends Component {
  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value);
    },
  });

  // 提交创建
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (!errors) {
        console.log(values);
        Dialog.confirm({
          style: { width: '250px' },
          title: '操作确认',
          content: '是否提交新增数据',
          onOk: () => {
            Toast.loading({
              hasMask: true,
              content: '提交请求中...',
            });
          },
        });
      }
    });
  }

  handleCancel() {
    Dialog.alert({
      needWrapper: false,
      closable: true,
      title: '提示',
      content: '创建还未提交，确定要离开吗？',
      onOk: () => this.props.history.go(-1),
    });
  }

  render() {
    const { init } = this.field;
    const value = this.field.getValues();
    const {
      modelTypeName,
      supplierModelName,
    } = value;

    return (
      <div className={`page-${clsPrefix}`}>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item link="/">型号管理</Breadcrumb.Item>
            <Breadcrumb.Item>表单编辑</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Container style={{ minHeight: '79vh' }}>
          <h2 className="section-title">基础信息</h2>
          <Form field={this.field}>
            <FormItem label="model" {...formItemLayout} required>
              <Input
                maxLength={50}
                placeholder="请输入"
                {...init('modelId', {
                  rules: { required: true, message: '该项为必填项' },
                })}
              />
            </FormItem>

            <FormItem label="version" {...formItemLayout} required>
              <Select
                dataSource={versionDataSource}
                {...init('version', {
                  rules: { required: true, message: '该项为必填项' },
                })}
                style={{ width: '100%', position: 'relative' }}
              />
            </FormItem>

            <FormItem label="model name" {...formItemLayout}>
              <p className="next-form-text-align" style={{ lineHeight: '40px' }}>
                {modelTypeName || 'xx model name'}
              </p>
            </FormItem>

            <FormItem label="supplier" {...formItemLayout} required>
              <Input
                maxLength={50}
                placeholder="请输入"
                {...init('supplier', {
                  rules: { required: true, message: '该项为必填项' },
                })}
              />
            </FormItem>

            <FormItem label="supplier model" {...formItemLayout} required>
              <Input
                maxLength={50}
                placeholder="请输入"
                {...init('supplierModel', {
                  rules: { required: true, message: '该项为必填项' },
                })}
              />
            </FormItem>

            <FormItem label="supplier model name" {...formItemLayout}>
              <p className="next-form-text-align" style={{ lineHeight: '40px' }}>
                {supplierModelName || 'xx supplier model name'}
              </p>
            </FormItem>
            <FormItem label="supplier Number" {...formItemLayout}>
              <Input maxLength={50} placeholder="请输入" {...init('supplierSn')} />
            </FormItem>

            <FormItem label="MAC" {...formItemLayout}>
              <Input maxLength={50} placeholder="请输入" {...init('mac')} />
            </FormItem>

            <Row style={{ marginTop: '80px' }}>
              <Col offset="5">
                <Button
                  className={`${clsPrefix}-btn`}
                  type="primary"
                  onClick={this.handleSubmit.bind(this)}
                >
                  提交
                </Button>
                <Button
                  className={`${clsPrefix}-btn`}
                  type="normal"
                  onClick={this.handleCancel.bind(this)}
                >
                  取消
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
