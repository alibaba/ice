import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
const ComponentPanel = ({ dataSource }) => {
  return <div>ComponentPanel</div>;
};

ComponentPanel.defaultProps = {
  dataSource: {
    categories: [],
    components: [],
  },
};

ComponentPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    components: PropTypes.array.isRequired,
  }),
};

export default ComponentPanel;
