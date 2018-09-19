import React, { Component } from 'react';
import CustomTable from '../CustomTable';

const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      id: `00000${index}`,
      name: '聘用合同',
      ourCompany: '杭州xxx科技有限公司',
      otherCompany: '上海xxx科技有限公司',
      amount: '999,999',
      currency: 'CNY',
      state: '签约中',
    };
  });
};

export default class ContractTable extends Component {
  static displayName = 'ContractTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>修改合同</a>
        <span style={styles.separator} />
        <a style={styles.link}>查看详情</a>
      </div>
    );
  };

  columnsConfig = () => {
    return [
      {
        title: '合同编号',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '合同名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '我方公司',
        dataIndex: 'ourCompany',
        key: 'ourCompany',
        width: 160,
      },
      {
        title: '对方公司',
        dataIndex: 'otherCompany',
        key: 'otherCompany',
        width: 160,
      },
      {
        title: '合同金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
      },
      {
        title: '币种',
        dataIndex: 'currency',
        key: 'currency',
        width: 100,
      },
      {
        title: '合同状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
        width: 200,
      },
    ];
  };

  render() {
    return (
      <CustomTable
        columns={this.columnsConfig()}
        dataSource={getData()}
        style={this.props.style}
      />
    );
  }
}

const styles = {
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#52c41a',
    background: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: '4px',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};
