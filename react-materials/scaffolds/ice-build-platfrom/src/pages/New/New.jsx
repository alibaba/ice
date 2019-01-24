/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Message,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { Group: RadioGroup } = Radio;

@withRouter
export default class New extends Component {
  static displayName = 'New';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        status: 'pending',
      },
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
      if (errors) {
        Message.error('请填写完整的信息');
        return;
      }
      Message.success('添加完成');
      this.props.history.push('/');
      console.log({ values });
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>添加构建器</div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>名称</div>
              <IceFormBinder
                name="name"
                required
                triggerType="onBlur"
                message="名称不能为空"
              >
                <Input
                  placeholder="请输入名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>版本</div>
              <IceFormBinder
                name="version"
                required
                triggerType="onBlur"
                message="版本不能为空"
              >
                <Input
                  placeholder="1.0.0"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="version" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>类别</div>
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  <Option value="technology">Java</Option>
                  <Option value="professional">Node</Option>
                  <Option value="management">Python</Option>
                  <Option value="other">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>负责人</div>
              <IceFormBinder
                name="person"
                required
                triggerType="onBlur"
                message="负责人不能为空"
              >
                <Input
                  placeholder="请输入"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="person" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>时间</div>
              <IceFormBinder name="time">
                <DatePicker style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>状态</div>
              <IceFormBinder name="status">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '发布中',
                    },
                    {
                      value: '2',
                      label: '未发布',
                    },
                    {
                      value: '3',
                      label: '定时发布',
                    },
                    {
                      value: '4',
                      label: '已发布',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
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
