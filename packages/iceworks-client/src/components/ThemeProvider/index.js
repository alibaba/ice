import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const ThemeProvider = ({ theme, setTheme, children }) => {
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  theme: '',
  setTheme: () => {},
};

ThemeProvider.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
