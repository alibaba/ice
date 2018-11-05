import React, { Component } from 'react';
import { Icon } from '@icedesign/base';

export default class SmallCard extends Component {
  render() {
    const { data } = this.props;

    if (data) {
      return data.map((item, index) => (
        <div style={styles.card} key={index}>
          <div style={styles.container}>
            <div style={styles.image}>
              {item.name.substr(0, 1).toUpperCase()}
            </div>
            <div style={styles.content}>
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.desc}>{item.desc}</p>
            </div>
            <Icon type="set" size="small" style={styles.settingIcon} />
            {item.tag && <span style={styles.tag}>{item.tag}</span>}
          </div>
        </div>
      ));
    }
  }
}

const styles = {
  card: {
    padding: '0 8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    width: '25%',
    boxSizing: 'border-box',
    float: 'left',
  },
  container: {
    width: '100%',
    border: '1px solid #d9d9d9',
    borderRadius: '2px',
    backgroundColor: 'white',
    display: 'flex',
    position: 'relative',
    padding: '16px',
  },
  image: {
    width: '56px',
    height: '56px',
    lineHeight: '56px',
    textAlign: 'center',
    fontSize: '20px',
    color: 'white',
    backgroundColor: '#2091fb',
    borderRadius: '28px',
  },
  content: {
    marginLeft: '10px',
    flexGrow: '1',
  },
  name: {
    fontSize: '16px',
    color: '#2a2a2a',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: '3px 0 0 0',
  },
  desc: {
    fontSize: '13px',
    color: '#999999',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: '3px 0 0 0',
  },
  settingIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
  },
  tag: {
    position: 'absolute',
    height: '16px',
    lineHeight: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'rgb(255, 255, 255)',
    fontSize: '12px',
    padding: '0px 4px',
    borderRadius: '3px',
  },
};
