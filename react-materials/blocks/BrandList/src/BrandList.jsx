import React, { Component } from 'react';
import { Button } from '@alifd/next';

const brandlist = [
  require('./images/TB14LkieuSBuNjy1XcXXcYjFXa-226-78.png'),
  require('./images/TB1LgSMibuWBuNjSszgXXb8jVXa-206-72.png'),
  require('./images/TB1jFDwiamWBuNjy1XaXXXCbXXa-284-56.png'),
  require('./images/TB147fnikSWBuNjSszdXXbeSpXa-180-68.png'),
  require('./images/TB1fdJliDtYBeNjy1XdXXXXyVXa-208-78.png'),
  require('./images/TB19a2XikyWBuNjy0FpXXassXXa-244-68.png'),
  require('./images/TB1m7veieuSBuNjSsziXXbq8pXa-262-62.png'),
  require('./images/TB10Mjkib1YBuNjSszhXXcUsFXa-208-76.png'),
  require('./images/TB1zdJliDtYBeNjy1XdXXXXyVXa-184-76.png'),
  require('./images/TB1h9yEigaTBuNjSszfXXXgfpXa-298-70.png'),
  require('./images/TB1DPSIibGYBuNjy0FoXXciBFXa-128-60.png'),
  require('./images/TB1y9TNioR1BeNjy0FmXXb0wVXa-254-74.png'),
  require('./images/TB1SpDwiamWBuNjy1XaXXXCbXXa-242-46.png'),
  require('./images/TB1EkveieuSBuNjSsziXXbq8pXa-240-78.png'),
];

export default class BrandList extends Component {
  static displayName = 'BrandList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.titleWrapper}>
          <h3 style={styles.title}>专业的选择</h3>
          <div style={styles.titleLine}>
            <div style={styles.titleHighlightLine} />
          </div>
        </div>
        <p style={styles.desc}>
          270多个项目正在使用，持续可靠的稳定，即时有效的服务
        </p>
        <div style={styles.brandListWrapper}>
          {brandlist.map((item, index) => {
            return (
              <div style={styles.brandItem} key={index}>
                <img src={item} alt="" style={styles.brandImage} />
              </div>
            );
          })}
        </div>
        <div style={styles.extraInfo}>
          <Button
            component="a"
            href="#"
            target="_blank"
            style={styles.extraButton}
          >
            提交你的案例 +
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 60,
  },
  titleWrapper: {
    marginTop: 60,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#EEEEEE',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  title: {
    color: '#223C4E',
    fontSize: 36,
  },
  desc: {
    color: '#6D7A82',
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 24,
    width: 525,
    textAlign: 'center',
  },
  brandListWrapper: {
    marginTop: 75,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 1150,
  },
  brandItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 150,
    maxHeight: 40,
    padding: '0 20px',
    marginBottom: 60,
  },
  brandImage: {
    width: 'auto',
    height: 'auto',
    maxWidth: 150,
    maxHeight: 40,
  },
  extraButton: {
    borderColor: '#3080FE',
    background: 'transparent',
    color: '#3080FE',
  },
};
