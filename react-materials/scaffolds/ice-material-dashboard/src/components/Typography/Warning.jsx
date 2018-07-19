import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import typographyStyle from './typographyStyle.jsx';

function Warning({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={`${classes.defaultFontStyle} ${classes.warningText}`}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Warning);
