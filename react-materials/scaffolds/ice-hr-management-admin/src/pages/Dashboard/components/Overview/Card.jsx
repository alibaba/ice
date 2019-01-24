import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import FoundationSymbol from '@icedesign/foundation-symbol';

export default class Card extends Component {
  render() {
    const { data = [] } = this.props;
    return (
      <IceContainer style={styles.container}>
        {data.map((item, index) => {
          const hasBorder = index !== data.length - 1 ? styles.border : {};
          return (
            <div style={{ ...styles.body, ...hasBorder }} key={index}>
              <FoundationSymbol type={item.icon} style={styles.icon} />
              <div style={styles.info}>
                <p style={styles.label}>{item.label}</p>
                <h4 style={styles.value}>{item.value}</h4>
              </div>
            </div>
          );
        })}
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '10px 20px',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
  },
  info: {
    marginLeft: '20px',
  },
  icon: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eee',
    borderRadius: '4px',
  },
  label: {
    margin: '10px 0 5px',
    fontSize: '12px',
  },
  value: {
    margin: '5px 0 10px',
    fontWeight: 'bold',
    color: '#333',
  },
  border: {
    borderBottom: '1px solid #eee',
  },
};
