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
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>图书捐赠</div>
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
                name="bookName"
              >
                <Input
                  placeholder="请输入图书名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="bookName" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>ISBN</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="ISBN不能为空"
                name="isbn"
              >
                <Input
                  placeholder="图书背面右下角条纹码处"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="isbn" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>书目类别</div>
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  mode="multiple"
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
              <div style={styles.formLabel}>捐赠人</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="捐赠人不能为空"
                name="donator"
              >
                <Input
                  placeholder="请输入"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="donator" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>捐赠时间</div>
              <IceFormBinder name="time">
                <DatePicker
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>状态</div>
              <IceFormBinder name="status">
                <RadioGroup

                  dataSource={[
                    {
                      value: 'pending',
                      label: '待入库',
                    },
                    {
                      value: 'instock',
                      label: '在库',
                    },
                    {
                      value: 'checkout',
                      label: '外借',
                    },
                    {
                      value: 'lost',
                      label: '遗失',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <p style={styles.tips}>
              提醒：若选择“在库”状态的话，请确认已经将图书放置到1-5-10-N的书架上
            </p>
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
  tips: {
    color: '#f37327',
    fontSize: '12px',
    margin: '20px 0',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
