import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SimpleFormDialog.scss';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      value: props.value || defaultValue,
    };
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() { }

  onOk = () => {
    this.refForm.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      if (typeof this.props.onOk === 'function') {
        this.props.onOk(values);
      }
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <Dialog
        className="simple-form-dialog"
        style={styles.simpleFormDialog}
        style={styles.dialog}
        autoFocus={false}
        footerAlign="center"
        title="简单表单"
        {...this.props}
        onOk={this.onOk}
        isFullScreen
        visible={this.state.visible}
      >
        <IceFormBinderWrapper
          ref={(ref) => { this.refForm = ref; }}
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span="3">
                <label style={styles.formLabel}>关键词</label>
              </Col>
              <Col span="16">
                <IceFormBinder
                  required
                  min={2}
                  max={10}
                  message="当前字段必填，且最少 2 个字最多 10 个字"
                >
                  <Input
                    name="keywords"
                    style={styles.input}
                    placeholder="多关键词用英文 , 号分割"
                  />
                </IceFormBinder>
                <IceFormError name="keywords" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col>
                <IceFormBinder>
                  <RadioGroup
                    name="type"
                    dataSource={[
                      {
                        value: 'post',
                        label: '文章',
                      },
                      {
                        value: 'video',
                        label: '视频',
                      },
                      {
                        value: 'image',
                        label: '图片',
                      },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col>
                <IceFormBinder>
                  <Input
                    name="content"
                    style={styles.input}
                    multiple
                    placeholder="请输入详细内容"
                    rows={4}
                  />
                </IceFormBinder>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
    );
  }
}

const styles = { 
  dialog: { width: '640px' }, 
  dialogContent: {},
  formRow: { marginTop: 20 }, 
  input: { width: '100%' }, 
  formLabel: { lineHeight: '26px' }, 
  simpleFormDialog: {},
};
