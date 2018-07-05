import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class SimpleTestimonial extends Component {
  static displayName = 'SimpleTestimonial';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="simple-testimonial" style={styles.simpleTestimonial}>
        <IceContainer>
          <div style={styles.item}>
            <p style={styles.description}>
              “
              随着个人用户对于互联网内容获取的要求和口味越来越特别，怎样提供更加精准个性化的资
              讯订阅服务是提升用户体验的关键。虽然我们发现目前市面上有非常多的资讯类
              app 都标榜自己能
              够提供个人定制化的新闻阅读功能，但是本质上来说一般都是通过新闻源+兴趣点+智能推荐这样的组合实现的
              ”
            </p>
            <div style={styles.infoBox}>
              <img
                style={styles.avatar}
                src={require('./images/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png')}
                alt="图像"
              />
              <h5 style={styles.name}>人物名</h5>
              <p style={styles.company}>就职公司/职务</p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  item: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    textAlign: 'center',
  },
  description: {
    lineHeight: '28px',
    color: '#999',
  },
  infoBox: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  },
  avatar: {
    width: '64px',
    height: '64px',
  },
  name: {
    margin: '0 15px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  company: {
    margin: 0,
  },
  simpleTestimonial: {},
};
