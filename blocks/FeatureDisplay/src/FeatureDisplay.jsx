'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './FeatureDisplay.scss';

const data = [
  {
    title: '特点1',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB1RBTKi4rI8KJjy0FpXXb5hVXa-456-456.png'
  },
  {
    title: '特点2',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB1LN_Ai9_I8KJjy0FoXXaFnVXa-450-453.png'
  },
  {
    title: '特点3',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB1K3JmgOqAXuNjy1XdXXaYcVXa-450-450.png'
  },
  {
    title: '特点4',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB124gfiY_I8KJjy1XaXXbsxpXa-450-453.png'
  },
  {
    title: '特点5',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB1s4T4i2DH8KJjy1XcXXcpdXXa-450-450.png'
  },
  {
    title: '特点6',
    description:
      '特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案特点描述文案',
    imgUrl: 'https://img.alicdn.com/tfs/TB1oEe3i8fH8KJjy1XbXXbLdXXa-453-453.png'
  }
];

export default class FeatureDisplay extends Component {
  static displayName = 'FeatureDisplay';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps, nextContext) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="feature-display">
        <IceCard>
          <div style={styles.items}>
            {data.map((item, index) => {
              return (
                <div key={index} style={styles.item}>
                  <img src={item.imgUrl} style={styles.image} />
                  <h3 style={styles.title}>{item.title}</h3>
                  <p style={styles.description}>{item.description}</p>
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
  items: { display: 'flex', flexWrap: 'wrap' },
  item: {
    width: '33%',
    textAlign: 'center',
    padding: '0 30px',
    margin: '40px 0'
  },
  title: { fontWeight: 'bold', fontSize: '20px' },
  image: { width: '150px', height: '150px', borderRadius: '50%' },
  description: { fontSize: '13px', lineHeight: '22px' }
};
