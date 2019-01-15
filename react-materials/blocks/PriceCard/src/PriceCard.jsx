import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const data = [
  {
    title: '基本配置',
    price: '99',
    description:
      '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  },
  {
    title: '标准配置',
    price: '199',
    description:
      '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  },
  {
    title: '高端配置',
    price: '299',
    description:
      '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  },
];

export default class PriceCard extends Component {
  static displayName = 'PriceCard';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <Row gutter="20" wrap>
            {data.map((item, index) => {
              return (
                <Col xxs="24" s="8" l="8" key={index}>
                  <div style={styles.item}>
                    <div style={styles.head}>
                      <h3 style={styles.title}>{item.title}</h3>
                      <p style={styles.description}>{item.description}</p>
                    </div>
                    <div style={styles.info}>
                      <p style={styles.price}>￥{item.price}</p>
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
      </div>
    );
  }
}

const styles = {
  container: {
    background: `url${require('./images/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png')}`,
    borderRadius: 0,
    width: '100%',
    padding: '80px 0',
  },
  content: {
    maxWidth: '1080px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  item: {
    marginBottom: '20px',
    padding: '20px 30px 60px',
    background: '#fff',
    borderRadius: '6px',
  },
  head: {
    padding: '30px 0',
    textAlign: 'center',
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
    fontSize: '22px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    margin: '20px auto',
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
