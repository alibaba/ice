/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Dialog, Input, Select, Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Col, Row } = Grid;

const typeData = [
  { label: '清单', value: '清单' },
  { label: '单品', value: '单品' },
];

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: props.value,
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  onOkHandler = () => {
    this.props.onOk && this.props.onOk(this.state.value);
  };

  render() {
    return (
      <Dialog
        title="编辑数据"
        onClose={this.props.onClose}
        onCancel={this.props.onCancel}
        afterClose={this.props.afterClose}
        onOk={this.onOkHandler}
        visible={this.state.visible}
        style={{ width: 400 }}
      >
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div>
            <Row>
              <Col span={4}>
                <span style={styles.label}>标题</span>
              </Col>
              <Col span={18}>
                <IceFormBinder
                  required
                  max={20}
                  name="title"
                  message="当前标题必填"
                >
                  <Input style={styles.formField} />
                </IceFormBinder>
                <IceFormError name="title" />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={4}>
                <span style={styles.label}>类型</span>
              </Col>
              <Col span={18}>
                <IceFormBinder name="type">
                  <Select dataSource={typeData} style={styles.formField} />
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
  row: {
    marginTop: '10px',
  },
  label: {
    lineHeight: '30px',
  },
  formField: {
    width: '100%',
  },
};

export default DialogDecorator(FormDialog);
