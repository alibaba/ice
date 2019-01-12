import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import RichEditor from './RichEditor';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // ajax values
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
          <IceContainer title="文章发布">
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="这里填写文章标题" />
                    </IceFormBinder>
                    <IceFormError name="title" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="作者" required>
                    <IceFormBinder
                      name="author"
                      required
                      message="作者信息必填"
                    >
                      <Input placeholder="填写作者名称" />
                    </IceFormBinder>
                    <IceFormError name="author" />
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
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
                              {errors.map((item) => item.message).join(',')}
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
                  发布文章
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
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
