import React, { Component } from 'react';
import './LeftContentDisplay.scss';

export default class LeftContentDisplay extends Component {
  static displayName = 'LeftContentDisplay';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="left-content-display" style={styles.leftContentDisplay} style={styles.container}>
        <div style={styles.content}>
          <div style={styles.col}>
            <h2 style={styles.title}>功能描述</h2>
            <p style={styles.description}>
              功能描述的文案，功能描述的文案功能描述的文案功能描述的文案
            </p>
          </div>
          <div style={styles.col}>
            <img
              src="https://img.alicdn.com/tfs/TB1MgyDjsLJ8KJjy0FnXXcFDpXa-618-1046.png"
              alt="img"
              style={styles.image}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {"container":{"margin":"0 auto","width":"1080px"},"content":{"display":"flex","position":"relative","alignItems":"center","overflow":"hidden","height":"600px"},"col":{"width":"50%"},"title":{"fontSize":"28px","fontWeight":"bold"},"description":{"color":"#666","lineHeight":"22px"},"image":{"position":"absolute","top":"20px","width":"40%"},"leftContentDisplay":{}}
