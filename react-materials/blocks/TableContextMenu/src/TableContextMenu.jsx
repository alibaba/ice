import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { ContextMenuTrigger } from 'react-contextmenu';
import CustomContextMenu from './CustomContextMenu';

const mockData = [
  { id: 1, time: '2016-07-08' },
  { id: 2, time: '2017-08-09' },
  { id: 3, time: '2018-09-10' },
];

function collect(props) {
  return { value: props.data };
}

export default class TableContextMenu extends Component {
  static displayName = 'TableContextMenu';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: mockData,
    };
  }

  handleClick = (e, data) => {
    console.log(data);
  };

  renderTime = (value, index, record) => {
    return (
      <ContextMenuTrigger
        id="contextMenuContainer"
        data={record}
        collect={collect}
      >
        <div className="well">{value}</div>
      </ContextMenuTrigger>
    );
  };

  render() {
    const { dataSource } = this.state;
    return (
      <IceContainer title="自定义右键操作">
        <Table dataSource={dataSource}>
          <Table.Column title="Id" dataIndex="id" />
          <Table.Column title="Time" dataIndex="time" cell={this.renderTime} />
        </Table>

        <CustomContextMenu />
      </IceContainer>
    );
  }
}
