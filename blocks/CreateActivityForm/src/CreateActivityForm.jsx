import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
} from '@icedesign/base';

import './CreateActivityForm.scss';

// Form 和 FormItem 用于描述表单 UI 结构
// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
// Inpput 等为具体表单组件
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};

export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        area: 'location1',
        time: [],
        delivery: false,
        type: ['地推活动'],
        resource: '线下场地免费',
        extra: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        name: '',
        area: 'location1',
        time: [],
        delivery: false,
        type: ['地推活动'],
        resource: '线下场地免费',
        extra: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
      }
      // 提交当前填写的数据
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="活动发布" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <Form direction="ver">
              <FormItem label="活动名称：" required {...formItemLayout}>
                <IceFormBinder name="name" required message="活动名称必须填写">
                  <Input />
                </IceFormBinder>
                <IceFormError name="name" />
              </FormItem>
              <FormItem label="活动区域：" {...formItemLayout}>
                <IceFormBinder name="area">
                  <Select
                    className="next-form-text-align"
                    dataSource={[
                      { label: '区域一', value: 'location1' },
                      { label: '区域二', value: 'location2' },
                    ]}
                  />
                </IceFormBinder>
              </FormItem>
              <FormItem label="活动时间：" {...formItemLayout}>
                <IceFormBinder
                  name="time"
                  type="array"
                  // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                  valueFormatter={(date, dateStr) => dateStr}
                >
                  <RangePicker showTime />
                </IceFormBinder>
              </FormItem>
              <FormItem label="即时配送：" {...formItemLayout}>
                <IceFormBinder name="delivery">
                  <SwitchForForm />
                </IceFormBinder>
              </FormItem>
              <FormItem label="活动性质：" {...formItemLayout}>
                <IceFormBinder
                  name="type"
                  len={2}
                  type="array"
                  message="活动性质必须选择两个"
                >
                  <CheckboxGroup
                    className="next-form-text-align"
                    dataSource={[
                      { label: '美食线上活动', value: '美食线上活动' },
                      { label: '地推活动', value: '地推活动' },
                      { label: '线下主题活动', value: '线下主题活动' },
                      { label: '单纯品牌曝光', value: '单纯品牌曝光' },
                    ]}
                  />
                </IceFormBinder>
                <div>
                  <IceFormError name="type" />
                </div>
              </FormItem>
              <FormItem label="特殊资源：" {...formItemLayout}>
                <IceFormBinder name="resource">
                  <RadioGroup
                    className="next-form-text-align"
                    dataSource={[
                      { label: '线上品牌商赞助', value: '线上品牌商赞助' },
                      { label: '线下场地免费', value: '线下场地免费' },
                    ]}
                  />
                </IceFormBinder>
              </FormItem>
              <FormItem label="活动形式：" {...formItemLayout}>
                <IceFormBinder name="extra">
                  <Input multiple />
                </IceFormBinder>
              </FormItem>

              <FormItem label=" " {...formItemLayout}>
                <Button type="primary" onClick={this.submit}>
                  立即创建
                </Button>
                <Button style={styles.resetBtn} onClick={this.reset}>
                  重置
                </Button>
              </FormItem>
            </Form>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  label: {
    textAlign: 'right',
  },
  resetBtn: {
    marginLeft: 20,
  },
};
