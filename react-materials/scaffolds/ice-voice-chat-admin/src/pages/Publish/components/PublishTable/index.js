import React, { Component } from 'react';
import { Table } from '@icedesign/base';

export default class PublishTable extends Component {
  static displayName = 'PublishTable';

  render() {
    return (
      <Table hasBorder={false}>
        <Table.Column title="发布时间" dataIndex="time" />
        <Table.Column title="版本说明" dataIndex="desc" />
      </Table>
    );
  }
}
