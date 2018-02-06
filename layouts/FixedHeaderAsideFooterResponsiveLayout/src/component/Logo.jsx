import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Logo extends PureComponent {
  render() {
    const { collapse } = this.props;
    const textStyle = !collapse ? { ...styles.lgText } : { ...styles.mdText };

    return (
      <div className="logo-wrap" style={styles.logoWrap}>
        <Link to="/">
          <span style={{ ...styles.logo, ...textStyle }}>ICE</span>
          {!collapse && (
            <div style={{ ...styles.desc, ...styles.smText }}>
              ICE
              <br />
              Design
            </div>
          )}
        </Link>
      </div>
    );
  }
}

const styles = {
  logoWrap: {
    height: '62px',
    lineHeight: '62px',
    textAlign: 'center',
  },
  borderBottom: {
    borderBottom: '1px solid #222d32',
  },
  logo: {
    color: '#3080FE',
    fontWeight: 'bold',
    fontFamily: 'Helvetica, sans-serif',
  },
  desc: {
    display: 'inline-block',
    lineHeight: '14px',
    color: '#3080FE',
    marginLeft: 6,
  },
  lgText: {
    fontSize: '36px',
  },
  mdText: {
    fontSize: '24px',
  },
  smText: {
    fontSize: '12px',
  },
};
