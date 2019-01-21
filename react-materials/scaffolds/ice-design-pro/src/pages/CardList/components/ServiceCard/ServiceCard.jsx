import React, { Component } from 'react';
import { Grid, Icon, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map(() => {
    return {
      name: '商品名称',
      desc: '这里是一段相关商品的简介，介绍产品的功能、特点',
      tag: '精选',
    };
  });
};

export default class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (message) => {
    Feedback.toast.success(message);
  };

  render() {
    const mockData = getData();
    return (
      <Row wrap gutter="20">
        {mockData.map((item, index) => {
          return (
            <Col xxs="24" s="12" l="8" key={index}>
              <IceContainer style={styles.container}>
                <div style={styles.body}>
                  <h5 style={styles.name}>{item.name}</h5>
                  <p style={styles.desc}>{item.desc}</p>
                  <div style={styles.tag}>{item.tag}</div>
                </div>
                <div style={styles.footer}>
                  <a
                    onClick={() => this.handleClick('无权限查看库存')}
                    style={{ ...styles.link, ...styles.line }}
                  >
                    <Icon type="office" size="small" style={styles.icon} />{' '}
                    查看库存
                  </a>
                  <a
                    onClick={() => this.handleClick('无权限查看商品')}
                    style={styles.link}
                  >
                    <Icon type="box" size="small" style={styles.icon} />
                    查看商品
                  </a>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  body: {
    padding: '20px',
    height: '120px',
    position: 'relative',
    borderBottom: '1px solid #f0f0f0',
  },
  name: {
    margin: '0',
    padding: '0',
    height: '28px',
    lineHeight: '28px',
    fontSize: '16px',
    color: '#333',
  },
  desc: {
    fontSize: '14px',
    color: '#666',
    margin: '12px 0',
  },
  tag: {
    background: '#f4f4f4',
    color: '#666',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '4px 12px',
    textAlign: 'center',
    borderRadius: '50px',
    fontSize: '12px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    height: '56px',
    lineHeight: '56px',
    color: '#666',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
  line: {
    borderRight: '1px solid #f0f0f0',
  },
  icon: {
    marginRight: '5px',
  },
};
