'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio
} from '@icedesign/base';

import './CreateActivityForm.scss';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
};
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="活动发布">
          <Form direction="ver">
            <FormItem label="活动名称：" {...formItemLayout}>
              <Input />
            </FormItem>
            <FormItem label="活动区域：" {...formItemLayout}>
              <Select
                className="next-form-text-align"
                dataSource={[
                  { label: '区域一', value: 'location1' },
                  { label: '区域二', value: 'location2' }
                ]}
              />
            </FormItem>
            <FormItem label="活动时间：" {...formItemLayout}>
              <DatePicker />
            </FormItem>
            <FormItem label="即时配送：" {...formItemLayout}>
              <Switch />
            </FormItem>
            <FormItem label="活动性质：" {...formItemLayout}>
              <CheckboxGroup
                className="next-form-text-align"
                dataSource={[
                  { label: '美食线上活动', value: '美食线上活动' },
                  { label: '地推活动', value: '地推活动' },
                  { label: '线下主题活动', value: '线下主题活动' },
                  { label: '单纯品牌曝光', value: '单纯品牌曝光' }
                ]}
              />
            </FormItem>
            <FormItem label="特殊资源：" {...formItemLayout}>
              <RadioGroup
                className="next-form-text-align"
                dataSource={[
                  { label: '线上品牌商赞助', value: '线上品牌商赞助' },
                  { label: '线下场地免费', value: '线下场地免费' }
                ]}
              />
            </FormItem>
            <FormItem label="活动形式：" {...formItemLayout}>
              <Input multiple />
            </FormItem>

            <FormItem label=" " {...formItemLayout}>
              <Button type="primary">立即创建</Button>
              <Button style={styles.resetBtn}>重置</Button>
            </FormItem>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right'
  },
  resetBtn: {
    marginLeft: 20
  }
};
