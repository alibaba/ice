'use strict';

import React, { Component } from 'react';
import './DynamicBanner.scss';

export default class DynamicBanner extends Component {
  static displayName = 'DynamicBanner';

  handleMouseEnter = () => {
    const ele = document.getElementById('bannerBox');
    const thisPX = ele.offsetLeft;
    const thisPY = ele.offsetTop;
    const boxWidth = ele.offsetWidth;
    const boxHeight = ele.offsetHeight;

    ele.addEventListener('mousemove', function(event) {
      const mouseX = event.pageX - thisPX;
      const mouseY = event.pageY - thisPY;
      let X;
      let Y;
      if (mouseX > boxWidth / 2) {
        X = mouseX - boxWidth / 2;
      } else {
        X = mouseX - boxWidth / 2;
      }
      if (mouseY > boxHeight / 2) {
        Y = boxHeight / 2 - mouseY;
      } else {
        Y = boxHeight / 2 - mouseY;
      }

      ele.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
    });
  };

  handleMouseLeave = () => {
    const ele = document.getElementById('bannerBox');
    ele.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  render() {
    return (
      <div className="dynamic-banner" style={styles.dynamicBanner}>
        <div
          className="banner-box"
          style={styles.bannerBox}
          id="bannerBox"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <span className="image" style={styles.image} />
          <span className="slogan" style={styles.slogan}>
            更快，更优，更 Cool
          </span>
          <span className="copyright" style={styles.copyright}>
            企业级泛后台应用解决方案
          </span>
        </div>
      </div>
    );
  }
}

const styles = {
  dynamicBanner: { perspective: '800px' },
  bannerBox: {
    position: 'relative',
    width: '600px',
    height: '300px',
    margin: '100px auto',
    background:
      "url('http://static.smartisanos.cn/index/img/store/home/banner-3d-item-1-box-1_61bdc2f4f9.png') center no-repeat",
    backgroundSize: '100% 100%',
    borderRadius: '10px',
    transformStyle: 'preserve-3d',
    transformOrigin: '50% 50%',
    transform: 'rotateY(0deg) rotateX(0deg)'
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: '8px',
    left: '0',
    background:
      'url("http://static.smartisanos.cn/index/img/store/home/banner-3d-item-1-box-3_8fa7866d59.png") center no-repeat',
    backgroundSize: '95% 100%',
    transform: 'translateZ(40px)'
  },
  slogan: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    fontSize: '30px',
    color: '#fff',
    textAlign: 'right',
    fontWeight: 'lighter',
    transform: 'translateZ(20px)'
  },
  copyright: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'right',
    fontWeight: 'lighter',
    transform: 'translateZ(0px)'
  }
};
