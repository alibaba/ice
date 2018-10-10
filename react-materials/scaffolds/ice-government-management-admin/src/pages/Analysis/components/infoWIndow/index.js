import React, { Component } from 'react';
import { Icon } from '@icedesign/base';

const mock = [
  {
    title: '地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议地方政府召开会议',
    date: '09-11'
  }, {
    title: '地方政府召开会议',
    date: '09-11'
  }, {
    title: '地方政府召开会议',
    date: '09-11'
  }, {
    title: '地方政府召开会议',
    date: '09-11'
  }, {
    title: '地方政府召开会议',
    date: '09-11'
  }, {
    title: '地方政府召开会议',
    date: '09-11'
  }
];

export default class InfoWindow extends Component {
  static displayName = 'InfoWindow';

  render() {

    return(
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>信息窗</h4>
          <ul>
            {mock.map((item, index) => {
              return (
                <li style={styles.list} key={index}>
                  <span style={styles.listLeft}>
                    <span style={styles.circle}/>
                    {item.title}
                  </span>
                  <span style={styles.date}>[{item.date}]</span>
                </li>
              );
            })}
          </ul>
          <div style={styles.icon}>
            <Icon type="ellipsis" size="xs"/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '50%',
    boxSizing: 'border-box',
    padding: '12px'
  },
  card: {
    width: '100%',
    padding: '24px',
    color: '#44426e',
    fontSize: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative'
  },
  title: {
    marginTop: '0',
    marginBottom: '20px',
    borderLeft: '5px solid #0056f4',
    paddingLeft: '10px',
    lineHeight: '20px'
  },
  list: {
    margin: '16px 0',
    color: '#454973',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    border: '1px solid #0059da',
    borderRadius: '50%',
    width: '7px',
    height: '7px',
    marginRight: '10px',
    display: 'inline-block'
  },
  date: {
    alignSelf: 'flex-end',
    display: 'inline-block',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flex: '1'
  },
  listLeft: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  icon: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#dae7ff',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#004cf8'
  }
};
