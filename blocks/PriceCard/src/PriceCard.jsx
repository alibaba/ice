import React, { Component } from 'react';
import './PriceCard.scss';

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
      <div className="price-card" style={styles.priceCard}>
        <div style={styles.container}>
          <div style={styles.items}>
            {data.map((item, index) => {
              const rowLastItem =
                (index + 1) % 3 === 0 ? styles.rowLastItem : {};
              return (
                <div
                  key={index}
                  style={{ ...styles.item, ...rowLastItem }}
                  className="item"
                >
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
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background:
      'url(https://img.alicdn.com/tfs/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png)',
    backgroundSize: 'cover',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '120px 0',
    width: '1080px',
    margin: '0 auto',
  },
  item: {
    width: '28%',
    marginRight: '8%',
    background: '#FAFAFA',
    borderRadius: '6px',
    paddingBottom: '50px',
  },
  rowLastItem: {
    marginRight: 0,
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
    margin: '0',
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
    padding: '4px 15px',
    background: '#3080FE',
    borderRadius: '12px',
    color: '#fff',
  },
  priceCard: {},
};
