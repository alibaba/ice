import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import { injectIntl } from 'react-intl';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import data from './data';

@injectIntl
export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      tabKey: 'all',
    };
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '发布时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '操作',
        key: 'action',
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
    const {
      intl: { formatMessage },
    } = this.props;
    const tabs = [
      { tab: formatMessage({ id: 'app.base.table.tab1' }), key: 'all' },
      { tab: formatMessage({ id: 'app.base.table.tab2' }), key: 'review' },
      { tab: formatMessage({ id: 'app.base.table.tab3' }), key: 'released' },
      { tab: formatMessage({ id: 'app.base.table.tab4' }), key: 'rejected' },
    ];

    return (
      <IceContainer>
        <Tab onChange={this.handleTabChange}>
          {tabs.map((item) => {
            return (
              <Tab.Item title={item.tab} key={item.key}>
                <CustomTable
                  dataSource={dataSource[this.state.tabKey]}
                  columns={this.columns}
                  hasBorder={false}
                />
              </Tab.Item>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}
