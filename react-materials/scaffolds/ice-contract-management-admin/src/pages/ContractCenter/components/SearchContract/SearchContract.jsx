import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import ContractTable from '../../../../components/ContractTable';
import SearchFilter from '../../../../components/SearchFilter';

export default class SearchContract extends Component {
  static displayName = 'SearchContract';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: '0' }}>
        <ContainerTitle title="合同中心" />
        <div style={{ padding: '20px' }}>
          <SearchFilter />
          <ContractTable />
        </div>
      </IceContainer>
    );
  }
}
