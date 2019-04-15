import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox, Radio } from '@icedesign/base';
import CreateForm from '../CreateForm';

const { Group: RadioGroup } = Radio;

class FooterForm extends Component {
  static displayName = 'FooterForm';

  render() {
    const {
      value: { footer },
    } = this.props;

    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.formChange}
      >
        <div style={styles.formGroup}>
          <div style={styles.formHead}>
            <span style={styles.title}>页脚：</span>
            <IceFormBinder required name="footer.enabled">
              <Checkbox size="large" checked={footer.enabled} />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>定位：</span>
            <IceFormBinder required name="footer.position">
              <RadioGroup>
                <Radio
                  id="positionFixed"
                  value="fixed"
                  disabled={!footer.enabled}
                >
                  固定
                </Radio>
                <Radio
                  id="positionStatic"
                  value="static"
                  disabled={!footer.enabled}
                >
                  静态
                </Radio>
              </RadioGroup>
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>通栏：</span>
            <IceFormBinder required name="footer.width">
              <RadioGroup>
                <Radio
                  id="fullWidth"
                  value="full-width"
                  disabled={!footer.enabled}
                >
                  是
                </Radio>
                <Radio
                  id="elasticWidth"
                  value="elastic-width"
                  disabled={!footer.enabled}
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

export default CreateForm(FooterForm);

const styles = {
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
