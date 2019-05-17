import React from 'react';
import PropTypes from 'prop-types';

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
