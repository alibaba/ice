import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Search, Button, Table, Dialog, Pagination } from '@icedesign/base';
import './Home.scss';

const { Column } = Table;
const clsPrefix = 'home';
const PAGESIZE = 10;
// TODO: 替换成自己的数据
const fields = ['id', 'id1', 'name1', 'name2', 'name3', 'name4', 'name5'];
const dataSourceBak = new Array(10).join(',').split(',').map((value, i) => {
  const res = {};
  fields.forEach((key) => {
    res[key] = `${key}-${i}`;
  });
  return res;
});

const Fetch = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      code: 200,
      content: {
        total: 88,
        dataSource: dataSourceBak,
      },
    });
  }, 1000);
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableLoading: true,
      visible: false,
      dataSource: [],
      current: 1,
      total: 0,
    };
    // 输入框
    this.value = '';
  }

  componentDidMount() {
    this.getData(1, true);
  }

  getData(page = 1, isInit = false) {
    // 分页参数
    const paginationParams = { // eslint-disable-line
      page,
      pageSize: PAGESIZE,
      value: this.value,
    };

    if (!isInit) {
      this.setState({
        isTableLoading: true,
      });
    }

    Fetch().then((data) => {
      if (data.code === 200) {
        const { content } = data;
        this.setState({
          dataSource: content.dataSource,
          isTableLoading: false,
          total: content.total,
          current: page,
        });
      }
    });
  }

  onClickView = () => {
    this.setState({
      visible: true,
    });
  }

  onClickDelete = () => {
    Dialog.confirm({
      title: '操作',
      style: { width: '250px' },
      content: '是否要删除该数据',
      onOk: () => {
        // 发送删除请求-loading-删除成功
      },
    });
  }

  onPaginationChange = (page) => {
    this.getData(page);
  }

  onOk = () => {
    this.setState({
      visible: false,
    });
  }

  onCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onSearch = () => {
    this.value = this.state.value;
    this.getData(1);
  }

  onInputChange = (value) => {
    this.setState({ value });
  }

  renderStatus = () => {
    const splitSpan = <span className="actions-split">|</span>;
    const view = <Link to="view">查看</Link>;
    const deleteItem = <a href="javascrpt:void(0)" onClick={this.onClickDelete}>删除</a>;
    const edit = <Link to="edit">编辑</Link>;
    return (
      <div>
        {view}
        {splitSpan}
        {deleteItem}
        {splitSpan}
        {edit}
      </div>
    );
  }

  render() {
    const { value, isTableLoading, visible, total, current, dataSource } = this.state;

    return (
      <div className={`page-${clsPrefix}`}>
        <div className="navigation-label">列表管理</div>
        <div className={`${clsPrefix}-main`}>
          <div className={`${clsPrefix}-header clearfix`}>
            <Search
              inputWidth={300}
              searchText=""
              placeholder="输入您要搜索的型号／类型／ID"
              className={`${clsPrefix}-search`}
              value={value}
              onChange={this.onInputChange}
              onSearch={this.onSearch}
            />
            <Link to="/edit">
              <Button className={`${clsPrefix}-new`}>+ 新增</Button>
            </Link>
          </div>
          <Dialog
            title="查看详情"
            onOk={this.onOk}
            onCancel={this.onCancel}
            visible={visible}
            onClose={this.onCancel}
          >
            <div style={{ width: '400px' }}>详情页面自行编辑</div>
          </Dialog>
          <Table
            hasBorder={false}
            isZebra={false}
            dataSource={dataSource}
            isLoading={isTableLoading}
            className="rhino-table"
          >
            <Column title="ID" dataIndex="id" />
            <Column title="型号ID" dataIndex="id1" />
            <Column title="名称" dataIndex="name1" />
            <Column title="Name" dataIndex="name2" />
            <Column title="状态" dataIndex="name3" />
            <Column title="状态2" dataIndex="name4" />
            <Column title="状态3" dataIndex="name5" />
            <Column title="操作" cell={this.renderStatus} width={200} />
          </Table>
        </div>
        <div className={`${clsPrefix}-pagination-right`}>
          <Pagination
            current={current}
            onChange={this.onPaginationChange}
            total={total}
            pageSize={PAGESIZE}
            hideOnlyOnePage
            shape="arrow-prev-only"
          />
        </div>
      </div>
    );
  }
}

export default Home;
