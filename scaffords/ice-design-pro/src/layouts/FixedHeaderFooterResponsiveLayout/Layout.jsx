import React, { PureComponent } from 'react';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './Layout.scss';

// 自定义背景图
const backgroundImage = 'https://img.alicdn.com/tfs/TB1j9kWgvDH8KJjy1XcXXcpdXXa-1680-870.jpg';

export default class LandingLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="fixed-header-footer-responsive-layout">
        <div className="fixed-header-footer-responsive-layout-header">
          <Header />
        </div>
        <div style={styles.introPicture} />
        <div style={styles.main}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  main: {
    position: 'relative',
    minHeight: '100vh',
  },
  introPicture: {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url('${backgroundImage}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};
