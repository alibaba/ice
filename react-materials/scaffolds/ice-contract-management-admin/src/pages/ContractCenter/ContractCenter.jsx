import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../components/ContainerTitle';
import ContractTable from '../../components/ContractTable';
import SearchHistory from './components/SearchHistory';

const { Row, Col } = Grid;

export default class ContractCenter extends Component {
  static displayName = 'ContractCenter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row gutter={20} wrap>
        <Col l="18">
          <IceContainer style={{ padding: '0' }}>
            <ContainerTitle title="合同中心" />
            <div style={{ padding: '20px' }}>
              <ContractTable />
            </div>
          </IceContainer>
        </Col>
        <Col l="6">
          <SearchHistory />
        </Col>
      </Row>
    );
  }
}
