import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const brandlist = [
  'https://img.alicdn.com/tfs/TB14.LkieuSBuNjy1XcXXcYjFXa-226-78.png',
  'https://img.alicdn.com/tfs/TB1LgSMibuWBuNjSszgXXb8jVXa-206-72.png',
  'https://img.alicdn.com/tfs/TB1jFDwiamWBuNjy1XaXXXCbXXa-284-56.png',
  'https://img.alicdn.com/tfs/TB147fnikSWBuNjSszdXXbeSpXa-180-68.png',
  'https://img.alicdn.com/tfs/TB1fdJliDtYBeNjy1XdXXXXyVXa-208-78.png',
  'https://img.alicdn.com/tfs/TB19a2XikyWBuNjy0FpXXassXXa-244-68.png',
  'https://img.alicdn.com/tfs/TB1m7veieuSBuNjSsziXXbq8pXa-262-62.png',
  'https://img.alicdn.com/tfs/TB10Mjkib1YBuNjSszhXXcUsFXa-208-76.png',
  'https://img.alicdn.com/tfs/TB1zdJliDtYBeNjy1XdXXXXyVXa-184-76.png',
  'https://img.alicdn.com/tfs/TB1h9yEigaTBuNjSszfXXXgfpXa-298-70.png',
  'https://img.alicdn.com/tfs/TB1DPSIibGYBuNjy0FoXXciBFXa-128-60.png',
  'https://img.alicdn.com/tfs/TB1y9TNioR1BeNjy0FmXXb0wVXa-254-74.png',
  'https://img.alicdn.com/tfs/TB1SpDwiamWBuNjy1XaXXXCbXXa-242-46.png',
  'https://img.alicdn.com/tfs/TB1EkveieuSBuNjSsziXXbq8pXa-240-78.png',
];

export default class BrandList extends Component {
  static displayName = 'BrandList';

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    const { isMobile } = this.state;

    return (
      <div
        style={{ ...styles.wrapper, ...(isMobile ? styles.wrapperMobile : {}) }}
      >
        <div
          style={{
            ...styles.titleWrapper,
            ...(isMobile ? styles.titleWrapperMobile : {}),
          }}
        >
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
  wrapperMobile: {
    marginTop: 0,
    height: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleWrapper: {
    marginTop: 60,
  },
  titleWrapperMobile: {
    marginTop: 0,
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
    maxWidth: 525,
    width: '80%',
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
