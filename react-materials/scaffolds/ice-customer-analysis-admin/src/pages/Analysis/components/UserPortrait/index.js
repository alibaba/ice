import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import ContainerTitle from '../../../../components/ContainerTitle';
import GenderChart from './GenderChart';
import AgeChart from './AgeChart';

const { Row, Col } = Grid;

export default class UserPortrait extends Component {
  static displayName = 'UserPortrait';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <ContainerTitle title="用户画像" />
        <Row wrap gutter="20">
          <Col l="12">
            <GenderChart />
          </Col>
          <Col l="12">
            <AgeChart />
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: '20px',
  },
};
