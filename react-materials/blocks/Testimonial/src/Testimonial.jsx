import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const generatorData = (count) => {
  return Array.from({ length: count }).map(() => {
    return {
      name: '人物名',
      company: '就职公司/职务',
      description:
        '随着个人用户对于互联网内容获取的要求和口味越来越特别，怎样提供更加精准个性化的资讯订阅服务是提升用户体验的关键。但是本质上来说一般都是通过新闻源智能推荐这样的组合实现的',
      imgUrl: require('./images/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'),
    };
  });
};

export default class Testimonial extends Component {
  static displayName = 'Testimonial';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = generatorData(3);
    return (
      <IceContainer>
        <div style={styles.items}>
          <Row gutter="20" wrap>
            {data.map((item, index) => {
              return (
                <Col xxs="24" s="8" l="8" key={index}>
                  <div style={styles.item}>
                    <p style={styles.description}>
                      “
                      {item.description}
                      ”
                    </p>
                    <div style={styles.infoBox}>
                      <img
                        style={styles.avatar}
                        src={item.imgUrl}
                        alt={item.name}
                      />
                      <div style={styles.baseInfo}>
                        <h5 style={styles.name}>{item.name}</h5>
                        <p style={styles.company}>{item.company}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '80px 0',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
  },
  item: {
    padding: '0 20px',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: '64px',
    height: '64px',
  },
  name: {
    margin: '10px 0 0',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  company: {
    margin: 0,
  },
  description: {
    lineHeight: '28px',
    color: '#999',
  },
};
