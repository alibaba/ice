import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const generatorData = (count) => {
  return Array.from({ length: count }).map(() => {
    return {
      name: '人物名',
      company: '就职公司/职务',
      description:
        '随着个人用户对于互联网内容获取的要求和口味越来越特别，怎样提供更加精准个性化的资讯订阅服务是提升用户体验的关键。虽然我们发现目前市面上有非常多的资讯类app 都标榜自己能够提供个人定制化的新闻阅读功能，但是本质上来说一般都是通过新闻源+兴趣点+智能推荐这样的组合实现的',
      imgUrl:
        'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
    };
  });
};

export default class TestimonialCard extends Component {
  static displayName = 'TestimonialCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = generatorData(3);
    return (
      <div className="testimonial-card">
        <IceContainer style={styles.container}>
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
                  <p style={styles.description}>
                    “
                    {item.description}
                    ”
                  </p>
                </div>
              );
            })}
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    background:
      'url(https://img.alicdn.com/tfs/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png)',
    borderRadius: 0,
    width: '100%',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '80px 0',
    maxWidth: '1080px',
    margin: '0 auto',
  },
  item: {
    width: '30%',
    padding: '20px 30px 60px',
    marginRight: '5%',
    background: '#fff',
    borderRadius: '6px',
  },
  rowLastItem: {
    marginRight: 0,
  },
  infoBox: {
    display: 'flex',
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '15px',
  },
  avatar: {
    width: '64px',
    height: '64px',
  },
  name: {
    margin: '0',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  company: {
    margin: 0,
  },
  description: {
    lineHeight: '28px',
  },
};
