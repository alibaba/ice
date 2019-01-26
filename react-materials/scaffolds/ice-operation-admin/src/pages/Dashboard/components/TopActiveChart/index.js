import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Table, Progress } from '@alifd/next';

const { Row, Col } = Grid;

const activePages = [
  {
    id: 1,
    page: '设备 A',
    amount: '2,80,489',
    percent: 60,
    state: 'success',
  },
  {
    id: 2,
    page: '设备 B',
    amount: '1,98,956',
    percent: 30,
    state: 'error',
  },
  {
    id: 3,
    page: '设备 C',
    amount: '1,90,257',
    percent: 70,
    state: 'success',
  },
  {
    id: 4,
    page: '设备 D',
    amount: '1,80,745',
    percent: 40,
    state: 'error',
  },
  {
    id: 5,
    page: '设备 E',
    amount: '1,24,693',
    percent: 60,
    state: undefined,
  },
  {
    id: 6,
    page: '设备 F',
    amount: '8,489',
    percent: 20,
    state: 'error',
  },
  {
    id: 7,
    page: '设备 G',
    amount: '5,233',
    percent: 80,
    state: 'success',
  },
  {
    id: 8,
    page: '设备 H',
    amount: '1,688',
    percent: 50,
    state: undefined,
  },
];

const ViewedProducts = [
  {
    id: 1,
    title: '设备 A',
    cate: '电子产品',
    amount: '38,600',
  },
  {
    id: 2,
    title: '设备 B',
    cate: '电子产品',
    amount: '33,779',
  },
  {
    id: 3,
    title: '设备 C',
    cate: '智能家居',
    amount: '29,588',
  },
  {
    id: 4,
    title: '设备 D',
    cate: '智能家电',
    amount: '8,636',
  },
];

export default class TopActiveChart extends Component {
  static displayName = 'TopActiveChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProduct = (value, index, record) => {
    return (
      <div style={styles.product}>
        <p style={styles.prodyctTitle}>{record.title}</p>
      </div>
    );
  };

  render() {
    return (
      <Row wrap gutter="20">
        <Col xxs="24" l="14">
          <IceContainer title="销售最多">
            <Table
              dataSource={activePages}
              hasBorder={false}
              hasHeader={false}
              style={{ width: '100%', height: '341px' }}
            >
              <Table.Column title="ID" dataIndex="id" width="5%" />
              <Table.Column title="页面" dataIndex="page" />
              <Table.Column title="销售数量" dataIndex="amount" />
              <Table.Column
                title="销售占比"
                dataIndex="page"
                cell={(value, index, record) => (
                  <Progress percent={record.percent} state={record.state} />
                )}
              />
            </Table>
          </IceContainer>
        </Col>
        <Col xxs="24" l="10">
          <IceContainer title="浏览最多">
            <Table
              dataSource={ViewedProducts}
              hasBorder={false}
              hasHeader={false}
              style={{ width: '100%', height: '341px' }}
            >
              <Table.Column
                title="产品"
                dataIndex="title"
                cell={(value, index, record) =>
                  this.renderProduct(value, index, record)
                }
                width="20%"
              />
              <Table.Column title="分类" dataIndex="cate" width="20%" />

              <Table.Column title="销售数量" dataIndex="amount" width="20%" />
            </Table>
          </IceContainer>
        </Col>
      </Row>
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
