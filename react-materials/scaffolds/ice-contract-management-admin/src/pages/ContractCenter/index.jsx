import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../components/ContainerTitle';
import ContractTable from '../../components/ContractTable';
import SearchHistory from './components/SearchHistory';

const { Row, Col } = Grid;

export default class ContractCenter extends Component {
  static displayName = 'ContractCenter';

  static propTypes = {};

  static defaultProps = {};

  state = {
    searchQueryHistory: null,
  }

  render() {
    return (
      <Row gutter={20} wrap>
        <Col l="18">
          <IceContainer style={{ padding: '0' }}>
            <ContainerTitle title="合同中心" />
            <div style={{ padding: '20px' }}>
              <ContractTable searchQueryHistory={this.state.searchQueryHistory} />
            </div>
          </IceContainer>
        </Col>
        <Col l="6">
          <SearchHistory onSearchHistory={(searchQuery) => {
            this.setState({
              searchQueryHistory: searchQuery,
            });
          }}
          />
        </Col>
      </Row>
    );
  }
}
