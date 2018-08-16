import Container from '@icedesign/container';
import React, { Component } from 'react';

class DataOverview extends Component {
  state = {
    dataSource: [
      {
        icon: require('./images/icon1.png'),
        title: '昨日内容浏览次数',
        total: '567',
      },
      {
        icon: require('./images/icon2.png'),
        title: '昨日粉丝数',
        total: '80',
      },
      {
        icon: require('./images/icon3.png'),
        title: '昨日活跃粉丝数',
        total: '89万',
        yestodayTrend: 'increase',
        yestodayNumber: '700',
        weekTrend: 'decrease',
        weekNumber: '8000',
      },
      {
        icon: require('./images/icon4.png'),
        title: '累计内容发布数',
        total: '20',
      },
      {
        icon: require('./images/icon5.png'),
        title: '内容健康度',
        total: '20',
      },
      {
        icon: require('./images/icon6.png'),
        title: '内容质量分',
        total: '20',
      },
      {
        icon: require('./images/icon7.png'),
        title: '微淘号达人指数',
        total: '20',
      },
    ],
  };

  render() {
    return (
      <Container style={styles.container}>
        {this.state.dataSource.map((data, index) => {
          return (
            <div key={index} style={styles.overviewItem}>
              <div style={styles.overviewItemIcon}>
                <img alt={data.title} src={data.icon} style={{ width: 70 }} />
              </div>
              <div
                style={{
                  paddingLeft: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div style={styles.overviewItemTitle}>{data.title}</div>
                <div style={styles.overviewItemTotal}>{data.total}</div>
              </div>
            </div>
          );
        })}
      </Container>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewItem: {
    flex: '0 0 25%',
    display: 'flex',
    padding: '10px 0',
  },
  overviewItemTitle: {
    fontSize: 12,
    lineHeight: '20px',
    color: '#999',
  },
  overviewItemTotal: {
    fontSize: 24,
    lineHeight: '30px',
    color: '#333',
  },
};

export default DataOverview;
