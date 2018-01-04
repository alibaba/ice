

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './OurTeam.scss';

const generatorData = (count) => {
  return Array.from({ length: count }).map((item, index) => {
    return {
      name: `成员${index + 1}`,
      description: '描述文案描述文案描述文案描述文案描述文案',
      imgUrl:
        'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
    };
  });
};

export default class OurTeam extends Component {
  static displayName = 'OurTeam';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps(nextProps, nextContext) { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() { }

  render() {
    const data = generatorData(4);
    return (
      <div className="our-team" style={styles.ourTeam}>
        <IceCard>
          <div style={styles.head}>
            <h2 style={styles.title}>我们的团队</h2>
            <p style={styles.intro}>
              我们是一支充满激情、志向远大、怀揣梦想的团队，也是一个思维活跃、朝气蓬勃、团结互助的大家庭。
            </p>
          </div>
          <div style={styles.items}>
            {data.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <img src={item.imgUrl} style={styles.avatar} />
                  <div style={styles.baseInfo}>
                    <h5 style={styles.name}>{item.name}</h5>
                    <p style={styles.description}>{item.description}</p>
                  </div>
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
  intro: { textAlign: 'center' },
  items: { display: 'flex', flexWrap: 'wrap' },
  item: { display: 'flex', width: '50%', padding: '0 40px', margin: '40px 0' },
  baseInfo: { display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '25px' },
  name: {
    fontWeight: 'bold',
    margin: '0 0 10px',
    fontSize: '15px',
  },
  description: { margin: 0 },
  avatar: { width: '150px', height: '150px' },
  ourTeam: {},
};
