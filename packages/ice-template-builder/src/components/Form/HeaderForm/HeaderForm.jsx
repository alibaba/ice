import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox, Radio } from '@icedesign/base';
import CreateForm from '../CreateForm';

const { Group: RadioGroup } = Radio;

class HeaderForm extends Component {
  static displayName = 'HeaderForm';

  render() {
    const {
      value: { header },
    } = this.props;
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.formChange}
      >
        <div style={styles.formGroup}>
          <div style={styles.formHead}>
            <span style={styles.title}>顶部导航：</span>
            <IceFormBinder required name="header.enabled">
              <Checkbox size="large" checked={header.enabled} />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
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

          <div style={styles.formItem}>
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

export default CreateForm(HeaderForm);

const styles = {
  formGroup: {
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e8e8e8',
  },
  formHead: {
    marginBottom: '15px',
  },
  formItem: {
    marginBottom: '10px',
  },
  title: {
    fontWeight: '500',
  },
};
