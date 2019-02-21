import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import CustomTable from '../CustomTable';

export default class ContractTable extends Component {
  static displayName = 'ContractTable';

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  handleUpdate = () => {
    Message.success('暂不支持修改合同');
  };

  handleMore = () => {
    Message.success('暂不支持查看详情');
  };

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
        <a style={styles.link} onClick={this.handleUpdate}>
          修改
        </a>
        <span style={styles.separator} />
        <a style={styles.link} onClick={this.handleMore}>
          查看
        </a>
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
    return <CustomTable {...this.props} columns={this.columnsConfig()} />;
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
