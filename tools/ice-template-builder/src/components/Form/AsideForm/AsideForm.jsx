import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox, Radio } from '@icedesign/base';
import CreateForm from '../CreateForm';

const { Group: RadioGroup } = Radio;

class AsideForm extends Component {
  static displayName = 'AsideForm';

  render() {
    const {
      value: { aside },
    } = this.props;

    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.formChange}
      >
        <div style={styles.formGroup}>
          <div style={styles.formHead}>
            <span style={styles.title}>侧边导航：</span>
            <IceFormBinder required name="aside.enabled">
              <Checkbox size="large" checked={aside.enabled} />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>折叠：</span>
            <IceFormBinder required name="aside.collapsed">
              <Checkbox
                size="large"
                checked={aside.collapsed}
                disabled={!aside.enabled}
              />
            </IceFormBinder>
          </div>
          <div style={styles.formItem}>
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
              </RadioGroup>
            </IceFormBinder>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

export default CreateForm(AsideForm);

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
