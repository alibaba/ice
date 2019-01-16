import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const generatorData = (count) => {
  return Array.from({ length: count }).map(() => {
    return {
      imgUrl: require('./images/TB1rnNcjr_I8KJjy1XaXXbsxpXa-603-474.png'),
    };
  });
};

export default class BrandShowCase extends Component {
  static displayName = 'BrandShowCase';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = generatorData(12);
    return (
      <div className="brand-show-case" style={styles.container}>
        <div style={styles.head}>
          <h2 style={styles.title}>品牌展示</h2>
          <p style={styles.intro}>
            广义的“品牌”是具有经济价值的无形资产，用抽象化的、特有的、能识别的心智概念来表现其差异性，从而在人们的意识当中占据一定位置的综合反映。品牌建设具有长期性
          </p>
        </div>
        <Row gutter="20" wrap style={styles.items}>
          {data.map((item, index) => {
            return (
              <Col xxs="12" s="4" l="4" key={index}>
                <div style={styles.item}>
                  <img src={item.imgUrl} style={styles.image} alt="" />
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
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  head: {
    width: '80%',
    maxWidth: '540px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
  },
  intro: {
    textAlign: 'center',
    color: '#999',
  },
  items: {
    margin: '30px 0',
  },
  item: {
    margin: '10px 0',
    textAlign: 'center',
  },
  image: {
    width: '100px',
    height: '80px',
  },
};
