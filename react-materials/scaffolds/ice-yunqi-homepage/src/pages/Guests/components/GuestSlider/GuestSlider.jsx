import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

import MOCK_DATA from './data';

export default class GuestSlider extends Component {
  static displayName = 'GuestSlider';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const settings = {
      className: 'guest-slider',
      autoplay: false,
      centerMode: true,
      infinite: true,
      centerPadding: '0',
      slidesToShow: 7,
      speed: 500,
    };
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <Slider {...settings}>
            {MOCK_DATA.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <div style={styles.itemBox}>
                    <img src={item.avatar} alt="" style={styles.img} />
                    <div style={styles.info}>
                      <h4 style={styles.name}>{item.name}</h4>
                      <p style={styles.job}>{item.job}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '800px',
    background:
      '#000 url(https://img.alicdn.com/tfs/TB1Cf27AKSSBuNjy0FlXXbBpVXa-1904-800.png) no-repeat center center',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  item: {
    float: 'left',
    display: 'inline-block',
  },
  itemBox: {
    position: 'relative',
  },
  info: {
    position: 'absolute',
    left: '10%',
    width: '80%',
    bottom: '5%',
    textAlign: 'left',
    overflow: 'hidden',
  },
  name: {
    margin: '0',
    color: '#fff',
    lineHeight: '26px',
    fontSize: '18px',
  },
  job: {
    color: '#fff',
    lineHeight: '16px',
    fontSize: '12px',
  },
  img: {
    maxWidth: '98%',
    display: 'inline-block',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
  },
};
