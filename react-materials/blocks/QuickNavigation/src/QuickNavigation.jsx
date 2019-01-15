/* eslint global-require: 0 */
import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

const navigation = [
  {
    img: require('./images/open_email.png'),
    title: 'Inbox',
  },
  {
    img: require('./images/user.png'),
    title: 'Profile',
  },
  {
    img: require('./images/message.png'),
    title: 'Forum',
  },
  {
    img: require('./images/search.png'),
    title: 'Search',
  },
  {
    img: require('./images/bar_chart.png'),
    title: 'Live Stats',
  },
  {
    img: require('./images/setting.png'),
    title: 'Settings',
  },
];

export default class QuickNavigation extends Component {
  static displayName = 'QuickNavigation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        {navigation.map((item, index) => {
          return (
            <Col xxs="12" l="4" key={index}>
              <IceContainer>
                <div style={styles.navItem}>
                  <img src={item.img} alt="" style={styles.img} />
                  <h4 style={styles.title}>{item.title}</h4>
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
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  img: {
    width: '48px',
    height: '48px',
  },
  title: {
    margin: '10px 0',
    color: '#666',
    fontWeight: '500',
  },
};
