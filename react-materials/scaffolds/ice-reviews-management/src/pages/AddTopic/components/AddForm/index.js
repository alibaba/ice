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
  Upload,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { CropUpload } = Upload;

@withRouter
export default class AddForm extends Component {
  static displayName = 'AddForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        status: 'open',
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
        return;
      }
      console.log({ values });
      Message.success('提交成功');
      this.props.history.push('/post/list');
    });
  };

  render() {
    return (
      <IceContainer title="新增话题" style={styles.container}>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>邀评话题</div>
              <IceFormBinder
                required
                name="title"
                triggerType="onBlur"
                message="名称不能为空"
              >
                <Input placeholder="请输入名称" style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="title" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>邀评简介</div>
              <IceFormBinder
                required
                name="desc"
                triggerType="onBlur"
                message="简介不能为空"
              >
                <Input
                  placeholder="请输入作品简介"
                  multiple
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="desc" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>邀评类别</div>
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  multiple
                  style={{ width: '400px' }}
                >
                  <Option value="car">汽车</Option>
                  <Option value="finance">金融</Option>
                  <Option value="other">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>发布作者</div>
              <IceFormBinder
                required
                name="author"
                triggerType="onBlur"
                message="发布作者不能为空"
              >
                <Input placeholder="请输入" style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="author" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>封面图</div>
              <IceFormBinder name="cover">
                <CropUpload
                  action="//www.easy-mock.com/mock/5b960dce7db69152d06475bc/ice/upload" // 该接口仅作测试使用，业务请勿使用
                  preview
                  previewList={[80, 60, 40]}
                  minCropBoxSize={100}
                >
                  <div style={{ marginTop: '20px' }}>
                    <img
                      ref="targetViewer"
                      alt=""
                      src="https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                      width="120px"
                      height="120px"
                    />
                  </div>
                </CropUpload>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>发布时间</div>
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
                      value: 'open',
                      label: '对外公开',
                    },
                    {
                      value: 'private',
                      label: '内部可见',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <p style={styles.tips}>
              提醒：若选择“对外公开”状态的话，则评测结果所有人均可见
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
    color: '#ee706d',
    fontSize: '12px',
    margin: '20px 0',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
