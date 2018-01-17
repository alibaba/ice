import React, { Component } from 'react';
import './ProductInfo.scss';

const dataSource = [
  {
    title: '主页背书',
    pic: 'https://img.alicdn.com/tfs/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png',
    desc: '这里填写具体的细节描述',
  },
  {
    title: '频道入驻',
    pic: 'https://img.alicdn.com/tfs/TB1wA5KinvI8KJjSspjXXcgjXXa-210-210.png',
    desc: '这里填写具体的细节描述',
  },
  {
    title: '商业扶持',
    pic: 'https://img.alicdn.com/tfs/TB1laelicjI8KJjSsppXXXbyVXa-210-210.png',
    desc: '这里填写具体的细节描述',
  },
  {
    title: '专属管家',
    pic: 'https://img.alicdn.com/tfs/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png',
    desc: '这里填写具体的细节描述',
  },
  {
    title: '资源优选',
    pic: 'https://img.alicdn.com/tfs/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png',
    desc: '这里填写具体的细节描述',
  },
  {
    title: '快捷搜索',
    pic: 'https://img.alicdn.com/tfs/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png',
    desc: '这里填写具体的细节描述',
  },
];

export default class ProductInfo extends Component {
  static displayName = 'ProductInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="product-info" style={styles.container}>
        {dataSource.map((item, index) => {
          return (
            <div key={index} style={styles.item}>
              <img src={item.pic} style={styles.pic} alt="" />
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.desc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  item: {
    width: '33.3333%',
    textAlign: 'center',
    padding: '10px 22px',
    marginBottom: '20px',
  },
  pic: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
  },
  desc: {
    lineHeight: '22px',
  },
};
