import React, { Component } from 'react';
import { Grid, Button, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

const DATA = [
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1n3HkAH2pK1RjSZFsXXaNlXXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB15qruAIfpK1RjSZFOXXa6nFXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1lnPoAHvpK1RjSZFqXXcXUVXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1n3HkAH2pK1RjSZFsXXaNlXXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1n3HkAH2pK1RjSZFsXXaNlXXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB15qruAIfpK1RjSZFOXXa6nFXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1lnPoAHvpK1RjSZFqXXcXUVXa-90-90.png',
  },
  {
    name: '淘小宝',
    jobTitle: 'CEO',
    avatar: 'https://img.alicdn.com/tfs/TB1n3HkAH2pK1RjSZFsXXaNlXXa-90-90.png',
  },
];

export default class Member extends Component {
  render() {
    return (
      <Row wrap gutter="20">
        {DATA.map((item, index) => {
          return (
            <Col l="6" key={index}>
              <IceContainer style={styles.container}>
                <img src={item.avatar} alt="" style={styles.avatar} />
                <h4 style={styles.name}>{item.name}</h4>
                <p style={styles.jobTitle}>{item.jobTitle}</p>
                <div style={styles.action}>
                  <Button type="primary">个人主页</Button>
                  <Button type="secondary" style={{ marginLeft: '10px' }}>
                    发送消息
                  </Button>
                </div>
                <div style={styles.socials}>
                  <a style={styles.icon}>
                    <Icon type="good" size="small" />
                  </a>
                  <a style={styles.icon}>
                    <Icon type="atm-away" size="small" />
                  </a>
                  <a style={styles.icon}>
                    <Icon type="phone" size="small" />
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    margin: '20px 0 10px',
    fontSize: '18px',
  },
  jobTitle: {
    fontWeight: '400',
    margin: '0 0 20px',
    fontSize: '16px',
  },
  avatar: {
    borderRadius: '50%',
    border: '2px solid #fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px',
  },
  socials: {
    margin: '20px 0',
  },
  icon: {
    margin: '0 10px',
  },
};
