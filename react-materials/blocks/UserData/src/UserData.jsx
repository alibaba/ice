/* eslint global-require: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Icon } from '@alifd/next';

const { Row, Col } = Grid;

export default class UserData extends Component {
  static displayName = 'UserData';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        <Col xxs="24" l="8">
          <IceContainer>
            <div style={styles.content}>
              <div style={styles.imgWrap}>
                <img
                  src={require('./images/email.png')}
                  alt=""
                  style={{ ...styles.img, width: '48px' }}
                />
              </div>

              <h2 style={styles.count}>9.25k Subscribers</h2>
              <p style={styles.desc}>Your main list is growing!</p>

              <Button type="primary" size="large" style={styles.button}>
                <Icon type="set" style={styles.icon} /> Manage list
              </Button>
            </div>
          </IceContainer>
        </Col>
        <Col xxs="24" l="8">
          <IceContainer>
            <div style={styles.content}>
              <div style={styles.imgWrap}>
                <img
                  src={require('./images/twitter.png')}
                  alt=""
                  style={styles.img}
                />
              </div>
              <h2 style={styles.count}>+36 followes</h2>
              <p style={styles.desc}>You are doing great!</p>
              <Button type="primary" size="large" style={styles.button}>
                <Icon type="personal-center" style={styles.icon} />Check them
                out
              </Button>
            </div>
          </IceContainer>
        </Col>
        <Col xxs="24" l="8">
          <IceContainer>
            <div style={styles.content}>
              <div style={styles.imgWrap}>
                <img
                  src={require('./images/check.png')}
                  alt=""
                  style={styles.img}
                />
              </div>
              <h2 style={styles.count}>Business Plan</h2>
              <p style={styles.desc}>This is your current active plan</p>
              <Button type="primary" size="large" style={styles.button}>
                <Icon type="lights" style={styles.icon} />Upgrade to VIP
              </Button>
            </div>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  count: {
    margin: '0',
  },
  desc: {
    margin: '0 0 10px',
    color: '#666',
  },
  imgWrap: {
    width: '68px',
    height: '68px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    maxWidth: '100%',
  },
  icon: {
    marginRight: '6px',
  },
  button: {
    margin: '20px 0',
  },
};
