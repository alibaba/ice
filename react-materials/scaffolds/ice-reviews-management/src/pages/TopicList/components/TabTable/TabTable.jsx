import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const MOCK_DATA = [
  {
    title: '话题一',
    name: '淘小宝',
    num: '1000',
  },
  {
    title: '话题二',
    name: '淘小宝',
    num: '2000',
  },
  {
    title: '话题三',
    name: '淘小宝',
    num: '3000',
  },
  {
    title: '话题四',
    name: '淘小宝',
    num: '1500',
  },
  {
    title: '话题五',
    name: '淘小宝',
    num: '500',
  },
  {
    title: '话题六',
    name: '淘小宝',
    num: '1000',
  },
  {
    title: '话题七',
    name: '淘小宝',
    num: '3000',
  },
  {
    title: '其他',
    name: '淘小宝',
    num: '1000',
  },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: MOCK_DATA,
    };
    this.columns = [
      {
        title: '话题',
        dataIndex: 'title',
        key: 'name',
        width: 150,
      },
      {
        title: '创建人',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '评测人数',
        width: 150,
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
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
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  render() {
    return (
      <div className="tab-table">
        <IceContainer title="话题列表">
          <CustomTable
            dataSource={this.state.dataSource}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
