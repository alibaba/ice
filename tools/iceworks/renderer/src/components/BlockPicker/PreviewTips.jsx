import React from 'react';
import PropTypes from 'prop-types';

const PreviewTips = ({ text, src, style }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <img style={styles.img} src={src} alt="" />
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  img: {
    width: '52px',
  },
};

PreviewTips.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string,
};

PreviewTips.defaultProps = {
  text: '请从左侧选择区块',
  src: 'https://img.alicdn.com/tfs/TB1yGn2mYZnBKNjSZFrXXaRLFXa-182-149.png',
  style: {},
};

export default PreviewTips;
