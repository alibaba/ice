import React, { Component } from 'react';
import { Table, Checkbox } from '@alifd/next';

const DATA = [
  {
    id: 1,
    type: 'Project',
    read: true,
    write: false,
    delete: false,
  },
  {
    id: 2,
    type: 'Tasks',
    read: true,
    write: true,
    delete: false,
  },
  {
    id: 3,
    type: 'Chat',
    read: true,
    write: false,
    delete: false,
  },
  {
    id: 4,
    type: 'Estimates',
    read: true,
    write: false,
    delete: false,
  },
];

export default class TopActiveChart extends Component {
  renderCheckbox = (value) => {
    return <Checkbox checked={value} />;
  };
  render() {
    return (
      <div style={{ padding: '20px 0', color: '#666' }}>
        <h2 style={styles.title}>设置权限</h2>
        <Table dataSource={DATA} hasBorder={false} style={{ width: '100%' }}>
          <Table.Column title="" dataIndex="type" />
          <Table.Column
            title="READ"
            dataIndex="read"
            cell={this.renderCheckbox}
          />
          <Table.Column
            title="Write"
            dataIndex="write"
            cell={this.renderCheckbox}
          />
          <Table.Column
            title="Delete"
            dataIndex="delete"
            cell={this.renderCheckbox}
          />
        </Table>
      </div>
    );
  }
}

const styles = {
  title: {
    color: '#666',
    fontSize: '16px',
    margin: '0 0 10px',
  },
};
