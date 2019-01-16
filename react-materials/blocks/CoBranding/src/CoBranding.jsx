import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class CoBranding extends Component {
  static displayName = 'CoBranding';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      require('./images/TB14.LkieuSBuNjy1XcXXcYjFXa-226-78.png'),
      require('./images/TB1zdJliDtYBeNjy1XdXXXXyVXa-184-76.png'),
      require('./images/TB1fdJliDtYBeNjy1XdXXXXyVXa-208-78.png'),
      require('./images/TB1m7veieuSBuNjSsziXXbq8pXa-262-62.png'),
      require('./images/TB19a2XikyWBuNjy0FpXXassXXa-244-68.png'),
      require('./images/TB1SpDwiamWBuNjy1XaXXXCbXXa-242-46.png'),
    ];
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.cardTitle}>合作品牌</h4>
        <div style={styles.brandContent}>
          <Row gutter="10">
            {data.map((url, index) => {
              return (
                <Col l="4" key={index}>
                  <a href="#" style={styles.brandLink}>
                    <img src={url} style={styles.brandLogo} alt="" />
                  </a>
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
  container: {
    padding: '40px 20px 60px',
    textAlign: 'center',
  },
  cardTitle: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '34px',
  },
  brandContent: {
    width: '70%',
    margin: '0 auto',
  },
  brandLogo: {
    width: '80px',
  },
};
