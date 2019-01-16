import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const data = [
  {
    title: '基本配置',
    price: '99',
    type: '微型企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: require('./images/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'),
  },
  {
    title: '标准配置',
    price: '199',
    type: '中小企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: require('./images/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'),
  },
  {
    title: '高端配置',
    price: '299',
    type: '大型企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: require('./images/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'),
  },
];

export default class PriceInfo extends Component {
  static displayName = 'PriceInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <Row gutter="20" wrap>
          {data.map((item, index) => {
            return (
              <Col xxs="24" s="8" l="8" key={index}>
                <div style={styles.item}>
                  <div style={styles.head}>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.price}>￥{item.price}</p>
                  </div>
                  <div style={styles.info}>
                    <img style={styles.image} src={item.imgUrl} alt="" />
                    <h5 style={styles.type}>{item.type}</h5>
                    <p style={styles.description}>{item.description}</p>
                  </div>
                  <div style={styles.buyBtn}>
                    <a href="/" style={styles.link}>
                      立即购买
                    </a>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '80px 0',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
  },
  item: {
    background: '#FAFAFA',
    borderRadius: '6px',
    paddingBottom: '50px',
    marginBottom: '20px',
  },
  head: {
    padding: '30px 0',
    background: '#3080FE',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '6px 6px 0 0',
  },
  title: {
    margin: '0 0 5px',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '18px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  image: {
    width: '52px',
    height: '52px',
  },
  type: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  description: {
    margin: '20px 0',
    lineHeight: '22px',
    textAlign: 'center',
    width: '60%',
    color: '#999',
  },
  buyBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  link: {
    padding: '6px 15px',
    background: '#3080FE',
    borderRadius: '16px',
    color: '#fff',
  },
};
