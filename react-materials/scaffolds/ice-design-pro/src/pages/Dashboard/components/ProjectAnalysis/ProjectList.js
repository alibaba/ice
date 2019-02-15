import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Progress } from '@alifd/next';
import { injectIntl } from 'react-intl';

const DATA = [
  {
    id: 1,
    name: '项目 A',
    member: '2,80,489',
    percent: 60,
    state: 'success',
  },
  {
    id: 2,
    name: '项目 B',
    member: '1,98,956',
    percent: 30,
    state: 'error',
  },
  {
    id: 3,
    name: '项目 C',
    member: '1,90,257',
    percent: 70,
    state: 'success',
  },
  {
    id: 4,
    name: '项目 D',
    member: '1,80,745',
    percent: 40,
    state: 'error',
  },
  {
    id: 5,
    name: '项目 E',
    member: '1,24,693',
    percent: 60,
    state: '',
  },
  {
    id: 6,
    name: '项目 F',
    member: '8,489',
    percent: 20,
    state: 'error',
  },
  {
    id: 7,
    name: '项目 G',
    member: '5,233',
    percent: 80,
    state: 'success',
  },
  {
    id: 8,
    name: '项目 H',
    member: '1,688',
    percent: 50,
    state: '',
  },
];

@injectIntl
export default class TopActiveChart extends Component {
  renderProduct = (value, index, record) => {
    return (
      <div style={styles.product}>
        <p style={styles.prodyctTitle}>{record.title}</p>
      </div>
    );
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <IceContainer
        title={formatMessage({ id: 'app.dashboard.project.table.title' })}
      >
        <Table dataSource={DATA} hasBorder={false} style={{ width: '100%' }}>
          <Table.Column title="项目名称" dataIndex="name" />
          <Table.Column title="项目成员" dataIndex="member" />
          <Table.Column
            title="项目进度"
            dataIndex="percent"
            cell={(value, index, record) => (
              <Progress percent={record.percent} state={record.state} />
            )}
          />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  product: {
    display: 'flex',
    alignItems: 'center',
  },
  productPic: {
    width: 60,
    height: 60,
  },
  productTitle: {
    margin: 0,
  },
};
