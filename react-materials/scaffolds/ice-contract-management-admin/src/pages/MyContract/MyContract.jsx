import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import ContractTable from '../../components/ContractTable';
import CustomNotice from './components/CustomNotice';

export default class MyContract extends Component {
  static displayName = 'MyContract';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <CustomNotice />
        <Button type="primary" size="large" style={styles.newContractButton}>
          新建合同
        </Button>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>我的合同</div>
        </div>
        <ContractTable />
      </IceContainer>
    );
  }
}

const styles = {
  tableHead: {
    height: '32px',
    lineHeight: '32px',
    margin: '0 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  newContractButton: {
    marginBottom: '20px',
  },
};
