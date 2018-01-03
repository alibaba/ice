

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './PriceInfo.scss';

const data = [
  {
    title: '基本配置',
    price: '99',
    type: '微型企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
  },
  {
    title: '标准配置',
    price: '199',
    type: '中小企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
  },
  {
    title: '高端配置',
    price: '299',
    type: '大型企业',
    description:
      '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
    imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
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

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps, nextContext) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="price-info" style={styles.priceInfo}>
        <div style={styles.items}>
          {data.map((item, index) => {
            const rowLastItem = (index + 1) % 3 === 0 ? styles.rowLastItem : {};
            return (
              <div
                key={index}
                style={{ ...styles.item, ...rowLastItem }}
                className="item"
                style={styles.item}
              >
                <div style={styles.head}>
                  <h3 style={styles.title}>{item.title}</h3>
                  <p style={styles.price}>￥{item.price}</p>
                </div>
                <div style={styles.info}>
                  <img style={styles.image} src={item.imgUrl} />
                  <h5 style={styles.type}>{item.type}</h5>
                  <p style={styles.description}>{item.description}</p>
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
    );
  }
}

const styles = { items: { display: 'flex', flexWrap: 'wrap', padding: '80px 0', width: '1080px', margin: '0 auto' }, item: { width: '28%', marginRight: '8%', background: '#FAFAFA', borderRadius: '6px', paddingBottom: '50px' }, rowLastItem: { marginRight: 0 }, head: { padding: '30px 0', background: '#3080FE', textAlign: 'center', color: '#fff', borderRadius: '6px 6px 0 0' }, title: { margin: '0 0 5px', fontWeight: 'bold', fontSize: '20px' }, price: { margin: '0', fontWeight: 'bold', fontSize: '18px' }, info: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }, image: { width: '52px', height: '52px' }, type: { margin: 0, fontSize: '15px', fontWeight: 'bold', marginTop: '10px' }, description: { margin: '20px 0', lineHeight: '22px', textAlign: 'center', width: '60%', color: '#999' }, buyBtn: { display: 'flex', justifyContent: 'center', marginTop: '20px' }, link: { padding: '4px 15px', background: '#3080FE', borderRadius: '12px', color: '#fff' }, priceInfo: {} };
