import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import RichEditor from './RichEditor';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class AddProject extends Component {
  state = {
    value: {
      title: '',
      desc: '',
      author: '',
      body: null,
      cats: [],
    },
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      Message.success('创建成功');
    });
  };

  render() {
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer>
            <h2 style={styles.title}>新建项目</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row gutter="20" wrap>
                <Col span="8">
                  <FormItem label="项目名称" required>
                    <IceFormBinder
                      name="projectName"
                      required
                      message="项目名称必填"
                    >
                      <Input placeholder="请输入项目名称" />
                    </IceFormBinder>
                    <IceFormError name="projectName" />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="开始时间" required>
                    <IceFormBinder
                      name="startTime"
                      required
                      message="项目开始时间必填"
                    >
                      <Input placeholder="请输入项目开始时间" />
                    </IceFormBinder>
                    <IceFormError name="startTime" />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="结束时间" required>
                    <IceFormBinder
                      name="endTime"
                      required
                      message="项目结束时间必填"
                    >
                      <Input placeholder="请输入项目结束时间" />
                    </IceFormBinder>
                    <IceFormError name="endTime" />
                  </FormItem>
                </Col>

                <Col span="8">
                  <FormItem label="负责人" required>
                    <IceFormBinder
                      name="leader"
                      required
                      message="项目负责人必填"
                    >
                      <Input placeholder="请输入项目负责人" />
                    </IceFormBinder>
                    <IceFormError name="leader" />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="分类" required>
                    <IceFormBinder
                      name="cats"
                      required
                      type="array"
                      message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        mode="multiple"
                        placeholder="请选择分类"
                        dataSource={[
                          { label: '分类1', value: 'cat1' },
                          { label: '分类2', value: 'cat2' },
                          { label: '分类3', value: 'cat3' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map(item => item.message).join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="分类" required>
                    <IceFormBinder
                      name="priority"
                      required
                      message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择项目权重"
                        dataSource={[
                          { label: '高', value: 'high' },
                          { label: '中', value: 'medium' },
                          { label: '低', value: 'low' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError name="priority" />
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="描述">
                <IceFormBinder name="desc">
                  <Input.TextArea placeholder="这里填写正文描述" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="正文" required>
                <IceFormBinder name="body">
                  <RichEditor />
                </IceFormBinder>
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  提交项目
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
