import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox, Radio } from '@icedesign/base';

const { Group: RadioGroup } = Radio;

export default class HeaderForm extends Component {
  static displayName = 'HeaderForm';

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
      value: { header },
    } = this.state;
    return (
      <IceFormBinderWrapper value={this.state.value} onChange={this.formChange}>
        <div className="form-group">
          <div className="form-item" style={styles.formItem}>
            <span>启用：</span>
            <IceFormBinder required name="header.enabled">
              <Checkbox size="large" defaultChecked />
            </IceFormBinder>
          </div>

          <div className="form-item" style={styles.formItem}>
            <span>定位：</span>
            <IceFormBinder required name="header.position">
              <RadioGroup>
                <Radio
                  id="positionFixed"
                  value="fixed"
                  disabled={!header.enabled}
                >
                  固定
                </Radio>
                <Radio
                  id="positionStatic"
                  value="static"
                  disabled={!header.enabled}
                >
                  静态
                </Radio>
              </RadioGroup>
            </IceFormBinder>
          </div>

          <div className="form-item" style={styles.formItem}>
            <span>通栏：</span>
            <IceFormBinder required name="header.width">
              <RadioGroup>
                <Radio
                  id="fullWidth"
                  value="full-width"
                  disabled={!header.enabled}
                >
                  是
                </Radio>
                <Radio
                  id="elasticWidth"
                  value="elastic-width"
                  disabled={!header.enabled}
                >
                  否
                </Radio>
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
