import React from 'react';
import PropTypes from 'prop-types';

const PreviewTitle = ({ title, count, style }) => {
  return (
    <div style={{ ...styles.previewTitle, ...style }}>
      {title} {count ? `( ${count} )` : null}
    </div>
  );
};

const styles = {
  previewTitle: {
    flex: '0 0 60px',
    fontSize: '18px',
    height: '60px',
    lineHeight: '60px',
    fontWeight: '500',
    color: '#333',
  },
};

PreviewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  count: PropTypes.number,
};

PreviewTitle.defaultProps = {
  style: {},
  count: 0,
};

export default PreviewTitle;
