/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Radio, Input } from '@icedesign/base';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import CreateForm from '../CreateForm';
import ColorPicker from './ColorPicker';

const { Group: RadioGroup } = Radio;
const presetColors = [
  {
    primaryColor: '#DD2727',
    secondaryColor: '#2192D9',
    title: '天猫红',
  },
  {
    primaryColor: '#FF6A00',
    secondaryColor: '#2192D9',
    title: '淘宝橙',
  },
  {
    primaryColor: '#FF4766',
    secondaryColor: '#2192D9',
    title: '零售红',
  },
  {
    primaryColor: '#0077FF',
    secondaryColor: '#0073DC',
    title: '运动蓝',
  },
  {
    primaryColor: '#C7A47B',
    secondaryColor: '#313949',
    title: '黑金系',
  },
  {
    primaryColor: '#EE6E9F',
    secondaryColor: '#FEC9C9',
    title: '樱花粉',
  },
];

class BasicForm extends Component {
  static displayName = 'BasicForm';

  render() {
    const { value = {} } = this.props;

    return (
      <IceFormBinderWrapper value={value} onChange={this.props.formChange}>
        <div className="form-group">
          {value.enableName ? (
            <div style={styles.formItem}>
              <span style={styles.title}>模板名称：</span>
              <IceFormBinder
                name="name"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: '布局名称必填',
                  },
                  {
                    validator(rule, val, callback) {
                      let errors = [];
                      const reg = /^[A-Z]+[A-Za-z0-9]+$/;
                      // 如果不符合规则，则输入 error
                      if (!val) {
                        return;
                      }

                      if (!reg.test(val)) {
                        errors = ['请输入正确的布局名称(如:BasicLayout)'];
                      }
                      callback(errors);
                    },
                  },
                ]}
              >
                <Input size="large" />
              </IceFormBinder>
              <IceFormError
                style={{ marginLeft: 70, marginTop: 10, display: 'block' }}
                name="name"
              />
            </div>
          ) : null}

          <div style={styles.formItem}>
            <span style={styles.title}>布局容器：</span>
            <IceFormBinder required name="layout">
              <RadioGroup>
                <Radio id="fullWidth" value="fluid-layout">
                  全屏
                </Radio>
                <Radio id="elasticWidth" value="boxed-layout">
                  固宽
                </Radio>
              </RadioGroup>
            </IceFormBinder>
          </div>

          {value.enableTheme ? (
            <div style={styles.formItem}>
              <span style={styles.title}>选择主题：</span>
              <IceFormBinder required name="themeConfig.theme">
                <RadioGroup>
                  <Radio id="fullWidth" value="dark">
                    深色
                  </Radio>
                  <Radio id="elasticWidth" value="light">
                    浅色
                  </Radio>
                </RadioGroup>
              </IceFormBinder>
            </div>
          ) : null}

          {value.enableTheme ? (
            <div style={styles.formItem}>
              <span style={styles.title}>定制皮肤：</span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '12px',
                  marginLeft: '12px',
                }}
              >
                <span style={{ paddingRight: 10, fontSize: 12 }}>主色</span>

                <ColorPicker
                  backgroundColor={value.themeConfig.primaryColor}
                  onChange={(color) =>
                    this.props.handleColorChange('primary', color)
                  }
                />

                <span
                  style={{ paddingLeft: 10, paddingRight: 10, fontSize: 12 }}
                >
                  辅色
                </span>
                <ColorPicker
                  backgroundColor={value.themeConfig.secondaryColor}
                  onChange={(color) =>
                    this.props.handleColorChange('secondary', color)
                  }
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '12px',
                  marginLeft: '12px',
                  fontSize: '12px',
                }}
              >
                <span style={{ paddingRight: 10 }}>推荐配色 </span>
                {presetColors.map((c, k) => {
                  return (
                    <Tooltip
                      key={k}
                      placement="top"
                      overlay={<span>{c.title}</span>}
                    >
                      <div
                        onClick={() => this.props.handlePresetColor(c)}
                        key={k}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: c.primaryColor,
                          width: 14,
                          height: 14,
                          border: '2px solid #fff',
                          marginRight: 12,
                          boxShadow: '0 0 1px rgba(0,0,0,0.3)',
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </IceFormBinderWrapper>
    );
  }
}

export default CreateForm(BasicForm);

const styles = {
  formItem: {
    marginBottom: '20px',
  },
  title: {
    fontWeight: '500',
  },
};
