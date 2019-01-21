import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon } from '@alifd/next';

// MOCK 数据
const EVENT_LIST = [
  {
    time: '2018',
    title: '会议',
    description: 'React Conf 2018',
    address: 'Henderson, Nevad',
  },
  {
    time: '2018',
    title: '会议',
    description: 'React Conf 2018',
    address: 'Henderson, Nevad',
  },
  {
    time: '2018',
    title: '会议',
    description: 'React Conf 2018',
    address: 'Henderson, Nevad',
  },
  {
    time: '2018',
    title: '会议',
    description: 'React Conf 2018',
    address: 'Henderson, Nevad',
  },
];

export default class EventList extends Component {
  render() {
    return (
      <IceContainer>
        {EVENT_LIST.map((item, index) => {
          return (
            <div style={styles.item} key={index}>
              <div style={styles.time}>{item.time}</div>
              <div style={styles.body}>
                <h5 style={styles.title}>{item.title}</h5>
                <p style={styles.description}>{item.description}</p>
                <p style={styles.address}>
                  <Icon type="map" size="xs" style={{ marginRight: '5px' }} />
                  {item.address}
                </p>
              </div>
            </div>
          );
        })}
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  time: {
    fontWeight: 'bold',
  },
  body: {
    marginLeft: '20px',
  },
  title: {
    margin: '0',
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    margin: '2px 0',
    color: '#444',
  },
  address: {
    margin: '0',
    color: '#666',
    fontSize: '12px',
  },
};
