import React from 'react';
import PropTypes from 'prop-types';

export default (defaultTheme, ThemeContext) => {
  const ThemeProvider = ({ theme, children }) => (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );

  ThemeProvider.defaultProps = {
    theme: defaultTheme,
  };

  ThemeProvider.propTypes = {
    theme: PropTypes.string,
    children: PropTypes.element.isRequired,
  };

  return ThemeProvider;
};
