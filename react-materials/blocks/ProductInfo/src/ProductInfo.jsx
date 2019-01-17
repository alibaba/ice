import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '主页背书',
    pic: require('./images/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png'),
    desc: '这里填写具体的细节描述',
  },
  {
    title: '频道入驻',
    pic: require('./images/TB1wA5KinvI8KJjSspjXXcgjXXa-210-210.png'),
    desc: '这里填写具体的细节描述',
  },
  {
    title: '商业扶持',
    pic: require('./images/TB1laelicjI8KJjSsppXXXbyVXa-210-210.png'),
    desc: '这里填写具体的细节描述',
  },
  {
    title: '专属管家',
    pic: require('./images/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png'),
    desc: '这里填写具体的细节描述',
  },
  {
    title: '资源优选',
    pic: require('./images/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png'),
    desc: '这里填写具体的细节描述',
  },
  {
    title: '快捷搜索',
    pic: require('./images/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png'),
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
        <Row wrap>
          {dataSource.map((item, index) => {
            return (
              <Col xxs="12" s="8" l="8" key={index} style={styles.item}>
                <img src={item.pic} style={styles.pic} alt="" />
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>{item.desc}</p>
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
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  item: {
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
    color: '#999',
  },
};
