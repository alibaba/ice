/* eslint global-require: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon } from '@alifd/next';

const ITEMS = [
  {
    title: 'Inbox',
    icon: 'box',
    badge: '654',
    color: '#ee706d',
  },
  {
    title: 'Profile visits',
    icon: 'browse',
    badge: '565',
    color: '#5e83fb',
  },
  {
    title: 'Call',
    icon: 'phone',
    badge: '12',
    color: '#f7da47',
  },
  {
    title: 'Message',
    icon: 'atm-away',
    badge: '54',
    color: '#58ca9a',
  },
  {
    title: 'Notifications',
    icon: 'lights',
    badge: '56',
    color: '#447eff',
  },
];

export default class Notice extends Component {
  render() {
    return (
      <IceContainer>
        {ITEMS.map((item, index) => {
          return (
            <div style={styles.item} key={index}>
              <Icon type={item.icon} style={styles.icon} />
              <span style={styles.title}>{item.title}</span>
              <span
                style={{
                  ...styles.badge,
                  color: item.color,
                  border: `1px solid ${item.color}`,
                }}
              >
                {item.badge}
              </span>
            </div>
          );
        })}
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    padding: '20px',
    borderBottom: '1px solid #f7f7f7',
    position: 'relative',
    cursor: 'pointer',
  },
  title: {
    marginLeft: '10px',
    fontSize: '16px',
    color: '#447eff',
  },
  badge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '400',
    position: 'absolute',
    right: '20px',
  },
};
