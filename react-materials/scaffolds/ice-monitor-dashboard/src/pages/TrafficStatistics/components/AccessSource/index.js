import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import CustomTable from '../../../../components/CustomTable';

const dataSource = [
  {
    domain: '内部跳转',
    uv: '3482',
    pv: '19334',
  },
  {
    domain: '直接访问',
    uv: '2483',
    pv: '24993',
  },
  {
    domain: 'www.baidu.com',
    uv: '4502',
    pv: '30492',
  },
  {
    domain: 'github.com',
    uv: '3498',
    pv: '40912',
  },
  {
    domain: 'www.google.com',
    uv: '3589',
    pv: '98423',
  },
  {
    domain: 'm.baidu.com',
    uv: '1294',
    pv: '30592',
  },
  {
    domain: 'www.google.com.hk',
    uv: '3054',
    pv: '94586',
  },
];

const columns = [
  {
    title: '域名',
    dataIndex: 'domain',
    key: 'domain',
  },
  {
    title: 'UV',
    dataIndex: 'uv',
    key: 'uv',
  },
  {
    title: 'PV',
    dataIndex: 'pv',
    key: 'pv',
  },
];

export default class AccessSource extends Component {
  render() {
    return (
      <IceContainer>
        <ContainerTitle title="访问来源" />
        <CustomTable columns={columns} dataSource={dataSource} />
      </IceContainer>
    );
  }
}
