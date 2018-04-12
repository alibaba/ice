import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tab.TabPane;

const tabs = [{ tab: '全部', key: 'all' }, { tab: '审核中', key: 'review' }];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 50,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 100,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '用户组',
        dataIndex: 'group',
        key: 'group',
        width: 120,
      },
      {
        title: '文章数',
        dataIndex: 'articleNum',
        key: 'articleNum',
        width: 80,
      },
      {
        title: '评论数',
        dataIndex: 'commentNum',
        key: 'commentNum',
        width: 80,
      },
      {
        title: '注册时间',
        dataIndex: 'regTime',
        key: 'regTime',
        width: 150,
      },
      {
        title: '最后登录时间',
        dataIndex: 'LastLoginTime',
        key: 'LastLoginTime',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    axios
      .get('/mock/user-list.json')
      .then((response) => {
        this.setState({
          dataSource: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane tab={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={dataSource[this.state.tabKey]}
                    columns={this.columns}
                    hasBorder={false}
                  />
                </TabPane>
              );
            })}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
