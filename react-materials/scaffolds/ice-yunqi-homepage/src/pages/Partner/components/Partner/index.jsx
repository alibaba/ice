import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

import MOCK_DATA from './data';

const { Row, Col } = Grid;

export default class Partner extends Component {
  static displayName = 'Partner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.bigTitle}>PARTNERS</div>
          <div style={styles.subTitle}>合作伙伴</div>
          <div style={styles.partnerBox}>
            {MOCK_DATA.map((item, index) => {
              return (
                <div style={styles.partnerItem} key={index}>
                  <div style={styles.partnerTitle}>{item.title}</div>
                  <Row wrap gutter={20}>
                    {item.partners.map((src, key) => {
                      return (
                        <Col l="4" key={key}>
                          <img src={src} alt="" style={styles.logo} />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: '78px',
    background: '#ffff',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  bigTitle: {
    paddingTop: '30px',
    fontSize: '60px',
    color: '#333',
    letterSpacing: '.77px',
  },
  subTitle: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'left',
    lineHeight: '30px',
    marginTop: '58px',
    paddingBottom: '30px',
    borderBottom: '1px solid #333',
  },
  partnerBox: {
    marginTop: '60px',
  },
  partnerItem: {
    marginBottom: '60px',
  },
  partnerTitle: {
    fontWeight: '700',
    fontSize: '20px',
    color: '#333',
    letterSpacing: '.25px',
    lineHeight: '24px',
    marginBottom: '40px',
  },
  logo: {
    maxWidth: '100%',
    marginBottom: '20px',
    display: 'block',
  },
};
