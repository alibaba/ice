import React, { Component } from 'react';
import { Grid, Feedback } from '@icedesign/base';

const { Row, Col } = Grid;

class FeatureItem extends Component {
  handleClick = () => {
    Feedback.toast.prompt('您暂无权限查看详情，请先申请权限');
  };

  render() {
    const { data } = this.props;
    return (
      <Row
        wrap
        style={{
          paddingTop: 20,
          alignItems: 'center',
          borderBottom: '1px solid #f4f4f4',
        }}
      >
        <Col l={3} s={4} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={styles.cover}>
            <img
              alt={data.title}
              style={{ width: 80, height: 80, display: 'block' }}
              src={data.icon}
            />
          </div>
        </Col>
        <Col l={11} s={10} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <h3 style={styles.title}>{data.title}</h3>
          <div style={styles.desc}>{data.desc}</div>
        </Col>
        <Col l={4} s={4} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
            {data.status}
          </div>
        </Col>
        <Col l={6} s={6} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={styles.desc}>{data.detail}</div>
          <div>
            <a style={styles.link} onClick={this.handleClick}>
              了解详情
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  title: {
    margin: 0,
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: '#999',
    lineHeight: '20px',
  },
  link: {
    fontSize: '12px',
    cursor: 'pointer',
    marginRight: '20px',
    color: '#5e83fb',
  },
};

export default FeatureItem;
