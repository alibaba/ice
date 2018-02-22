import React, { Component } from 'react';

const generatorData = (count) => {
  return Array.from({ length: count }).map((item, index) => {
    return {
      name: `成员${index + 1}`,
      description: '成员的相关描述',
      imgUrl:
        'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png',
    };
  });
};

export default class TeamDisplay extends Component {
  static displayName = 'TeamDisplay';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = generatorData(6);
    return (
      <div className="team-display" style={styles.container}>
        <h2 style={styles.title}>我们的团队</h2>
        <div style={styles.items}>
          {data.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <img src={item.imgUrl} style={styles.avatar} alt={item.name} />
                <h5 style={styles.name}>{item.name}</h5>
                <p style={styles.description}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '33%',
    padding: '0 40px',
    margin: '40px 0',
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  avatar: {
    width: '150px',
    height: '150px',
  },
};
