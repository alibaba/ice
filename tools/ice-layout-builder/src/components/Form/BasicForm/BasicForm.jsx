/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Radio, Input } from '@icedesign/base';
import Tooltip from 'rc-tooltip';

import ColorPicker from './ColorPicker';

import 'rc-tooltip/assets/bootstrap.css';

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

export default class BasicForm extends Component {
  static displayName = 'BasicForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  /**
   * 表单改变时动态监听
   */
  formChange = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.onChange(this.state.value);
      }
    );
  };

  handleColorChange = (key, hex) => {
    const { value } = this.state;
    if (key === 'primary') {
      value.themeConfig.primaryColor = hex;
    } else {
      value.themeConfig.secondaryColor = hex;
    }

    this.setState(
      {
        value,
      },
      () => {
        this.props.onChange(this.state.value);
      }
    );
  };

  handlePresetColor = (color) => {
    const { value } = this.state;
    value.themeConfig.primaryColor = color.primaryColor;
    value.themeConfig.secondaryColor = color.secondaryColor;

    this.setState(
      {
        value,
      },
      () => {
        this.props.onChange(this.state.value);
      }
    );
  };

  render() {
    const { value = {} } = this.state;
    return (
      <IceFormBinderWrapper value={value} onChange={this.formChange}>
        <div className="form-group">
          {value.enableName ? (
            <div className="form-item" style={styles.formItem}>
              <span>布局名称：</span>
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

          <div className="form-item" style={styles.formItem}>
            <span>布局容器：</span>
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
            <div className="form-item" style={styles.formItem}>
              <span>选择主题：</span>
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
            <div className="form-item" style={styles.formItem}>
              <span>定制皮肤：</span>
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
                  onChange={this.handleColorChange.bind(this, 'primary')}
                />

                <span
                  style={{ paddingLeft: 10, paddingRight: 10, fontSize: 12 }}
                >
                  辅色
                </span>
                <ColorPicker
                  backgroundColor={value.themeConfig.secondaryColor}
                  onChange={this.handleColorChange.bind(this, 'secondary')}
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
                        onClick={this.handlePresetColor.bind(this, c)}
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

const styles = {
  formItem: {
    marginBottom: '20px',
  },
};
