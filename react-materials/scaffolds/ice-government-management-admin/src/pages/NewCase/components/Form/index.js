/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select, DatePicker, Radio, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Option } = Select;
const { Group: RadioGroup } = Radio;

export default class DonationForm extends Component {
  static displayName = 'DonationForm';

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
        console.log({ errors });
        Message.error('提交失败');
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>案件名称</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="案件名称不能为空"
                name="casename"
              >
                <Input
                  placeholder="请输入案件名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="casename" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>案件编号</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="案件编号不能为空"
                name="id"
              >
                <Input
                  placeholder="图书背面右下角条纹码处"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="id" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>案件类别</div>
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  <Option value="1">知识产权</Option>
                  <Option value="2">劳动纠纷</Option>
                  <Option value="3">交通事故</Option>
                  <Option value="other">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>立案人</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="立案人不能为空"
                name="donator"
              >
                <Input placeholder="请输入" style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="donator" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>立案时间</div>
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
                      value: 'on',
                      label: '立即立案',
                    },
                    {
                      value: 'delay',
                      label: '延迟立案',
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
