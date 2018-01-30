import React, { Component } from 'react';
import { Table, Progress, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './ProgressTable.scss';

const getTableData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: 'A旗舰店',
      total: Math.ceil(Math.random() * 1000000),
      count: 300 - index * 10,
      progress: Math.ceil(Math.random() * 100),
    };
  });
};

export default class ProgressTable extends Component {
  static displayName = 'ProgressTable';

  constructor(props) {
    super(props);

    this.state = {
      dataSource: getTableData(),
      current: 1,
    };
  }

  renderCellProgress = value => (
    <Progress showInfo={false} percent={parseInt(value, 10)} />
  );

  onPageChange = (pageNo) => {
    this.setState({
      current: pageNo,
    });
  };

  render() {
    return (
      <div className="progress-table">
        <IceContainer className="tab-card" title="本月最活跃金主">
          <Table
            hasBorder
            getRowClassName={(record, index) => {
              return `progress-table-tr progress-table-tr${index}`;
            }}
            dataSource={this.state.dataSource}
          >
            <Table.Column title="店铺名称" dataIndex="name" />
            <Table.Column title="成交金额" dataIndex="total" />
            <Table.Column title="成交单数" dataIndex="count" />
            <Table.Column
              title=""
              dataIndex="progress"
              cell={this.renderCellProgress}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={this.state.current}
              onChange={this.onPageChange}
              shape="arrow-only"
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse',
  },
};
