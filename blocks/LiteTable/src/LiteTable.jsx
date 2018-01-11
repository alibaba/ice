import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Table } from '@icedesign/base';
import './LiteTable.scss';

const styles = {
  tableCard: { width: 430, padding: 10 },
  liteTable: {},
  todo0: { color: '#5485F7' },
  todo1: { color: '#64D874' },
  todo2: { color: '#999999' },
  todo3: { color: '#FA7070' },
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
      project: `这里是字数不能太长的项目名 ${index}`,
      owner: `开发者 ${index}`,
      status: generatorMockStatus(),
    };
  });
};

const statusComponents = {
  processing: <span style={styles.todo0}>进行中</span>,
  finish: <span style={styles.todo1}>已完成</span>,
  terminated: <span style={styles.todo2}>已终止</span>,
  pass: <span style={styles.todo3}>未通过</span>,
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

  // ICE: React Component 的生命周期

  componentWillMount() { }

  componentDidMount() { }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() { }

  renderStatus = (value) => {
    return statusComponents[value];
  };

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table" style={styles.liteTable}>
        <IceCard style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="项目名称" dataIndex="project" width={160} />
            <Table.Column title="创建者" dataIndex="owner" width={65} />
            <Table.Column
              title="状态"
              dataIndex="status"
              cell={this.renderStatus}
              width={65}
            />
          </Table>
        </IceCard>
      </div>
    );
  }
}
