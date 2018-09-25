import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import SearchFilter from '../../components/SearchFilter';
import ContractTable from '../../components/ContractTable';

export default class ContractSearch extends Component {
  static displayName = 'ContractSearch';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <SearchFilter />
        <ContractTable />
      </IceContainer>
    );
  }
}
