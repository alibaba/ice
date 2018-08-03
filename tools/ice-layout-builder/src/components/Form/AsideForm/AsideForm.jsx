import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox, Radio } from '@icedesign/base';

const { Group: RadioGroup } = Radio;

export default class AsideForm extends Component {
  static displayName = 'AsideForm';

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
        this.props.onChange(value);
      }
    );
  };

  render() {
    const {
      value: { aside },
    } = this.state;
    return (
      <IceFormBinderWrapper value={this.state.value} onChange={this.formChange}>
        <div className="form-group">
          <div className="form-item" style={styles.formItem}>
            <span>启用：</span>
            <IceFormBinder required name="aside.enabled">
              <Checkbox size="large" defaultChecked />
            </IceFormBinder>
          </div>

          <div className="form-item" style={styles.formItem}>
            <span>折叠：</span>
            <IceFormBinder required name="aside.collapsed">
              <Checkbox size="large" disabled={!aside.enabled} />
            </IceFormBinder>
          </div>
          <div className="form-item" style={styles.formItem}>
            <span>定位：</span>
            <IceFormBinder required name="aside.position">
              <RadioGroup>
                <Radio
                  id="fullWidth"
                  value="embed-fixed"
                  disabled={!aside.enabled}
                >
                  固定
                </Radio>
                <Radio
                  id="elasticWidth"
                  value="static"
                  disabled={!aside.enabled}
                >
                  静态
                </Radio>
                {/* TODO: 暂不支持
                      <Radio id="elasticWidth" value="overlay-fixed">
                        固定定位(悬浮)
                      </Radio>
                    */}
              </RadioGroup>
            </IceFormBinder>
          </div>
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
