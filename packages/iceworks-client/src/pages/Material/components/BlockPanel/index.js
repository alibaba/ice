import React from 'react';
import PropTypes from 'prop-types';

const BlockPanel = ({ dataSource }) => {
  return <div>BlockPanel</div>;
};

BlockPanel.defaultProps = {
  dataSource: {
    categories: [],
    blocks: [],
  },
};

BlockPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    blocks: PropTypes.array.isRequired,
  }),
};

export default BlockPanel;
