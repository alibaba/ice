import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './BrandShowCase.scss';

const generatorData = (count) => {
  return Array.from({ length: count }).map((item, index) => {
    return {
      imgUrl:
        'https://img.alicdn.com/tfs/TB1rnNcjr_I8KJjy1XaXXbsxpXa-603-474.png'
    };
  });
};

export default class BrandShowCase extends Component {
  static displayName = 'BrandShowCase';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps(nextProps, nextContext) { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() { }

  render() {
    const data = generatorData(12);
    return (
      <div className="brand-show-case">
        <IceCard>
          <div style={styles.head}>
            <h2 style={styles.title}>品牌展示</h2>
            <p style={styles.intro}>
              广义的“品牌”是具有经济价值的无形资产，用抽象化的、特有的、能识别的心智概念来表现其差异性，从而在人们的意识当中占据一定位置的综合反映。品牌建设具有长期性
            </p>
          </div>
          <div style={styles.items}>
            {data.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <img src={item.imgUrl} style={styles.image} />
                </div>
              );
            })}
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  head: { width: '50%', margin: '0 auto' },
  title: { textAlign: 'center', fontSize: '28px' },
  intro: { textAlign: 'center', color: '#999' },
  items: { display: 'flex', flexWrap: 'wrap', margin: '30px 0' },
  item: { width: '16.66%', margin: '10px 0', textAlign: 'center' },
  image: { width: '100px', height: '80px' }
};
