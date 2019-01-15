import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Pagination, Progress, Button } from '@alifd/next';
import EditDialog from './EditDialog';
import data from './data';

export default class ComplexProgressTable extends Component {
  renderTitle = (value, index, record) => {
    return (
      <div>
        <div style={styles.title}>{record.title}</div>
        <div style={styles.subTitle}>创建时间 {record.createTime}</div>
      </div>
    );
  };

  editItem = (index, record) => {
    EditDialog.show({
      onClose: () => {
        EditDialog.hide();
      },
      onCancel: () => {
        EditDialog.hide();
      },
      onOk: () => {
        EditDialog.hide();
      },
      value: record,
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div style={styles.operations}>
        <Button
          style={styles.operationButton}
          onClick={() => this.editItem(index, record)}
          text
        >
          编辑
        </Button>
        <Button style={styles.operationButton} text>
          删除
        </Button>
      </div>
    );
  };

  renderProgress = (value) => {
    return <Progress percent={value} />;
  };

  render() {
    return (
      <div className="complex-progress-table">
        <IceContainer style={styles.tableCard}>
          <Table
            dataSource={data}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="问题描述"
              cell={this.renderTitle}
              width={320}
            />
            <Table.Column
              title="完成进度"
              dataIndex="progress"
              width={230}
              cell={this.renderProgress}
            />
            <Table.Column
              title="优先级"
              dataIndex="priority"
              width={60}
              style={styles.priority}
            />
            <Table.Column
              title="操作"
              width={100}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  tableCard: {
    padding: '10px',
  },
  subTitle: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#999999',
  },
  operationButton: {
    marginRight: '10px',
  },
  priority: {
    width: '70px',
    textAlign: 'center',
  },
  operations: {
    lineHeight: '28px',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
