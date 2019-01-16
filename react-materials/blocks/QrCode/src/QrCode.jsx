/* eslint react/no-string-refs: 0, radix: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, NumberPicker, Grid, Input } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import QRCode from 'qrcode.react';
import ColorPicker from './ColorPicker';

const { Row, Col } = Grid;
const { Option } = Select;

export default class QrCode extends Component {
  static displayName = 'QrCode';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        url: 'https://alibaba.github.io/ice/',
        size: 180,
        fgColor: '#000000',
        bgColor: '#F7F1F1',
        level: 'L',
        renderAs: 'svg',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleChangeComplete = (color, type) => {
    const { value } = this.state;
    this.setState({
      value: Object.assign({}, value, { [type]: color.hex }),
    });
  };

  render() {
    const { value } = this.state;
    console.log(value);
    return (
      <IceContainer title="二维码生成器">
        <IceFormBinderWrapper value={value} onChange={this.formChange}>
          <div>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.label}>
                二维码大小
              </Col>
              <Col l="20">
                <IceFormBinder type="number">
                  <NumberPicker
                    step={5}
                    min={150}
                    max={300}
                    inputWidth="60px"
                    name="size"
                  />
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.label}>
                背景色
              </Col>
              <Col l="20">
                <ColorPicker
                  defaultColor={value.bgColor}
                  onChange={(color) => {
                    this.handleChangeComplete(color, 'bgColor');
                  }}
                />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.label}>
                前景色
              </Col>
              <Col l="20">
                <ColorPicker
                  defaultColor={value.fgColor}
                  onChange={(color) => {
                    this.handleChangeComplete(color, 'fgColor');
                  }}
                />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.label}>
                图案样式
              </Col>
              <Col l="20">
                <IceFormBinder name="level">
                  <Select defaultValue={value.level} style={{ width: '300px' }}>
                    <Option value="L">L</Option>
                    <Option value="M">M</Option>
                    <Option value="Q">Q</Option>
                    <Option value="H">H</Option>
                  </Select>
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.label}>
                二维码地址
              </Col>
              <Col l="20">
                <IceFormBinder name="url">
                  <Input.TextArea style={{ width: '300px' }} placeholder="https://alibaba.github.io/ice/" />
                </IceFormBinder>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row>
          <Col l="2" style={styles.label}>
            生成二维码
          </Col>
          <Col l="20">
            <QRCode
              value={value.url}
              size={value.size}
              fgColor={value.fgColor}
              bgColor={value.bgColor}
              level={value.level}
            />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '20px',
    alignItems: 'center',
  },
  label: {
    fontWeight: '450',
  },
};
