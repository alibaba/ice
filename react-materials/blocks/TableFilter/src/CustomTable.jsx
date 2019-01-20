import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon } from '@alifd/next';

const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      id: index + 1,
      orderID: `12022123${index}`,
      name: '张一峰',
      date: `2018-06-${index + 1}`,
      planDate: `2018-06-${index + 1}`,
      validData: `2018-06-${index + 1}`,
      category: '青霉素',
      state: '已审核',
      approver: '刘建明',
      approvalData: `2018-06-${index + 1}`,
    };
  });
};

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      dataSource: getData(),
    };
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  handleSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = a[dataIndex] - b[dataIndex];
      if (order === 'asc') {
        return result > 0 ? 1 : -1;
      }
      return result > 0 ? -1 : 1;
    });

    this.setState({
      dataSource,
    });
  };

  renderCatrgory = (value) => {
    return (
      <Balloon
        align="lt"
        trigger={<div style={{ margin: '5px' }}>{value}</div>}
        closable={false}
        style={{ lineHeight: '24px' }}
      >
        青霉素是抗菌素的一种，是能破坏细菌的细胞壁并在细菌细胞的繁殖期起杀菌作用的一类抗生素
      </Balloon>
    );
  };

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.circle} />
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <Icon type="edit" size="small" style={styles.editIcon} />
      </div>
    );
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={dataSource}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column title="序列号" dataIndex="id" sortable align="center" />
          <Table.Column title="调价单号" dataIndex="orderID" sortable />
          <Table.Column title="调价人" dataIndex="name" />
          <Table.Column title="调价日期" dataIndex="date" />
          <Table.Column title="计划生效日期" dataIndex="planDate" />
          <Table.Column title="实际生效日期" dataIndex="validData" />
          <Table.Column
            title="分类"
            dataIndex="category"
            cell={this.renderCatrgory}
          />
          <Table.Column
            title="状态"
            dataIndex="state"
            cell={this.renderState}
          />
          <Table.Column title="审核人" dataIndex="approver" />
          <Table.Column title="审核日期" dataIndex="approvalData" />
          <Table.Column title="操作" cell={this.renderOper} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
};
