import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceCard from '@icedesign/card';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import './SimpleTable.scss';

// 详细用法请参见 http://ice.alibaba-inc.com/modules/ice-data-binder
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/simple-table-list.json',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class SimpleTable extends Component {
  static displayName = 'SimpleTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData({
      page: 1,
    });
  }

  fetchData = ({ page }) => {
    this.props.updateBindingData('tableData', {
      data: {
        page,
      },
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span
          style={{
            marginLeft: '10px',
            lineHeight: '20px',
          }}
        >
          {record.title}
        </span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // todo
    console.log('record', record);
  };

  renderOperations = (value, index, record) => {
    return (
      <div className="simple-table-operation" style={{ lineHeight: '28px' }}>
        <a
          href="#"
          target="_blank"
          onClick={() => {
            this.editItem(record);
          }}
        >
          解决
        </a>
        <a href="#" target="_blank">
          详情
        </a>
        <a href="#" target="_blank">
          分类
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="simple-table">
        <IceCard>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column
              title="问题描述"
              cell={this.renderTitle}
              width={320}
            />
            <Table.Column title="问题分类" dataIndex="type" width={85} />
            <Table.Column
              title="发布时间"
              dataIndex="publishTime"
              width={150}
            />
            <Table.Column
              title="状态"
              dataIndex="publishStatus"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
