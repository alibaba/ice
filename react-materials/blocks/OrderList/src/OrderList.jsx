import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';

const mockData = [
  {
    price: 'US $2.45',
    status: '0',
    id: 1,
    product: [
      {
        description: '2017秋新款女韩版宽松一字领长袖打底衫套头针织薄款上衣',
        title: '单号：234253124122414',
      },
    ],
    children: [
      {
        price: 'US $2.5',
        status: 1,
        id: 2,
        product: [
          {
            description: 'Free shipping women Casual dresses lady dress plus size 2014',
            avatar: require('./images/placeholder.jpg'),
          },
        ],
      }
    ]
  },
  {
    price: 'US $2.5',
    status: 1,
    id: 2,
    product: [
      {
        description: '冬季美翻天90白鹅绒保暖连帽狐狸毛羽绒服外套',
        title: '单号：1567562412414',
        avatar: require('./images/placeholder.jpg'),
      },
    ],
    children: [
      {
        price: 'US $2.5',
        status: 1,
        id: 2,
        product: [
          {
            description: '冬季美翻天90白鹅绒保暖连帽狐狸毛羽绒服外套',
            avatar: require('./images/placeholder.jpg'),
          },
        ],
      }
    ]
  },
  {
    price: 'US $2.5',
    status: 1,
    id: 3,
    product: [
      {
        description:
          '柒柒家2017冬新款韩国时尚刺绣加厚超大毛领羽绒服女中长款过膝潮',
        title: '单号：145425342414',
        avatar: require('./images/placeholder.jpg'),
      },
    ],
    children: [
      {
        price: 'US $2.5',
        status: 1,
        id: 2,
        product: [
          {
            description: '冬季美翻天90白鹅绒保暖连帽狐狸毛羽绒服外套',
            avatar: require('./images/placeholder.jpg'),
          },
        ],
      }
    ]
  },
  {
    price: 'US $2.5',
    status: 1,
    id: 4,
    product: [
      {
        description: '宽松大码长袖镂空打底衫',
        title: '单号：12312412412414',
        avatar: require('./images/placeholder.jpg'),
      },
    ],
    children: [
      {
        price: 'US $2.5',
        status: 1,
        id: 2,
        product: [
          {
            description: '冬季美翻天90白鹅绒保暖连帽狐狸毛羽绒服外套',
            avatar: require('./images/placeholder.jpg'),
          },
        ],
      }
    ]
  },
];

export default class OrderList extends Component {
  static displayName = 'OrderList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: mockData,
    };
  }

  /**
   * 渲染订单信息
   */
  renderOrderInfo = (product) => {
    return (
      <div className="order-info" style={styles.orderInfo}>
        <img src={product[0].avatar} style={styles.orderImg} alt="头像" />
        <div className="order-description" style={styles.orderDescription}>
          {product[0].description}
        </div>
      </div>
    );
  };

  /**
   * 渲染订单价格
   */
  renderOrderPrice = (price) => {
    return <b>{price}</b>;
  };

  /**
   * 渲染订单单号
   */
  renderOrderNumber = (record) => {
    return <div>{record.product[0].title}</div>;
  };

  /**
   * 设置每一行的样式名称
   */
  getRowClassName = (record) => {
    if (record.status === 0) {
      return 'highlight-row';
    }
  };

  /**
   * 渲染操作行
   */
  renderOperation = () => {
    return (
      <a href="/" style={styles.orderDetailLink}>
        查看
      </a>
    );
  };

  /**
   * 选中当前行的回调
   */
  handleRowSelection = (selectedRowKeys, records) => {
    console.log('selectedRowKeys:', selectedRowKeys);
    console.log('records:', records);
  };

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'single',
    };

    const { tableData } = this.state;

    return (
      <div className="order-list" style={styles.orderList}>
        <IceContainer title="订单列表">
          <Table
            dataSource={tableData}
            getRowClassName={this.getRowClassName}
            hasBorder={false}
            rowSelection={this.handleRowSelection}
          >
            <Table.GroupHeader cell={this.renderOrderNumber} />
            <Table.Column
              cell={this.renderOrderInfo}
              title="商品"
              dataIndex="product"
              width={400}
            />
            <Table.Column
              cell={this.renderOrderPrice}
              title="价格"
              dataIndex="price"
              width={120}
            />
            <Table.Column
              cell={this.renderOperation}
              title="操作"
              width={100}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  orderImg: {
    width: '60px',
    height: '60px',
    float: 'left',
    marginRight: '10px',
  },
  orderDetailLink: {
    textDecoration: 'none',
  },
};
