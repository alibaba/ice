/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Option } = Select;

export default class RecommendForm extends Component {
  static displayName = 'RecommendForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>推荐图书</div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>图书名称</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="图书名称不能为空"
              >
                <Input
                  placeholder="请输入图书名称"
                  name="bookName"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="bookName" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>出版社</div>
              <IceFormBinder>
                <Input
                  placeholder="图书出版社"
                  name="publisher"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>作者</div>
              <IceFormBinder>
                <Input
                  name="author"
                  placeholder="图书作者"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>参考价格</div>
              <IceFormBinder>
                <Input
                  placeholder="请输入数字"
                  name="price"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>书目类别</div>
              <IceFormBinder>
                <Select
                  placeholder="请选择"
                  multiple
                  name="cate"
                  size="large"
                  style={{ width: '400px' }}
                >
                  <Option value="technology">技术领域</Option>
                  <Option value="professional">专业领域</Option>
                  <Option value="management">管理沟通</Option>
                  <Option value="other">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>推荐人</div>
              <IceFormBinder>
                <Input
                  placeholder="请输入数字"
                  name="referrer"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
              size="large"
              style={styles.submitButton}
              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
  formContent: {
    marginLeft: '30px',
  },
  formItem: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    width: '70px',
    marginRight: '15px',
    textAlign: 'right',
  },
  formError: {
    marginLeft: '10px',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
