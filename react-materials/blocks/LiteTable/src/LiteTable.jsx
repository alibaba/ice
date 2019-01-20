import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';

const styles = {
  processing: {
    color: '#5485F7',
  },
  finish: {
    color: '#64D874',
  },
  terminated: {
    color: '#999999',
  },
  pass: {
    color: '#FA7070',
  },
};

const generatorMockStatus = () => {
  const random = parseInt(Math.random() * 10, 10);
  if (random < 3) {
    return 'processing';
  } else if (random >= 3 && random < 6) {
    return 'finish';
  } else if (random >= 6 && random < 8) {
    return 'terminated';
  } else if (random >= 8) {
    return 'pass';
  }
};

const generatorData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      project: `项目名称 ${index}`,
      owner: `开发者 ${index}`,
      status: generatorMockStatus(),
    };
  });
};

const statusComponents = {
  processing: <span style={styles.processing}>进行中</span>,
  finish: <span style={styles.finish}>已完成</span>,
  terminated: <span style={styles.terminated}>已终止</span>,
  pass: <span style={styles.pass}>未通过</span>,
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: generatorData(),
    };
  }

  renderStatus = (value) => {
    return statusComponents[value];
  };

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="项目名称" dataIndex="project" width={200} />
            <Table.Column title="创建者" dataIndex="owner" width={100} />
            <Table.Column
              title="状态"
              dataIndex="status"
              cell={this.renderStatus}
              width={100}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}
