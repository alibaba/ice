import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Dialog, Message } from '@alifd/next';
import ContractTable from '../../components/ContractTable';
import CustomNotice from './components/CustomNotice';
import CreateContractForm from './components/CreateContractForm';

export default class MyContract extends Component {
  static displayName = 'MyContract';

  constructor(props) {
    super(props);
    this.state = {
      createFormVisible: false,
    };
  }

  showCreateForm = () => {
    this.setState({
      createFormVisible: true,
    });
  };

  hideCreateForm = () => {
    this.setState({
      createFormVisible: false,
    });
  };

  onCreateSubmitSuccess = (formValue) => {
    Message.success('新建成功');
    this.hideCreateForm();
    // 根据需求确定是否要重新加载 list 数据
  };

  onCreateSubmitCancel = () => {
    this.hideCreateForm();
  };

  render() {
    return (
      <IceContainer>
        <CustomNotice />
        <Button
          type="primary"
          size="large"
          style={styles.newContractButton}
          onClick={this.showCreateForm}
        >
          新建合同
        </Button>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>我的合同</div>
        </div>
        <ContractTable enableFilter={false} />

        <Dialog
          title="新建合同"
          visible={this.state.createFormVisible}
          footer={false}
          onClose={this.hideCreateForm}
        >
          <CreateContractForm
            onSubmitSuccess={this.onCreateSubmitSuccess}
            onSubmitCancel={this.onCreateSubmitCancel}
          />
        </Dialog>

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
