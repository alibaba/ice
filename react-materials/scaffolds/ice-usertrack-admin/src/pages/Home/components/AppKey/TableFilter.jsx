import React, { Component } from 'react';
import { Grid, Input } from '@alifd/next';

const { Row, Col } = Grid;

export default class TableFilter extends Component {
  onChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <Row style={styles.row}>
        <Col l="2">
          <div style={styles.label}>数据过滤:</div>
        </Col>
        <Col>
          <Input
            placeholder="请输入 APPID、APPKey、应用名称"
            hasClear
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
        </Col>
      </Row>
    );
  }
}

const styles = {
  row: {
    margin: '4px 0 20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
};
