import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import { withTheme } from '@components/ThemeProvider';

const ThemeToggler = ({ theme }) => {
  const { theme: currentTheme, toggleTheme } = theme;
  return (
    <Button type="primary" onClick={toggleTheme}>
      主题: {currentTheme}
    </Button>
  );
};

ThemeToggler.defaultProps = {
  theme: {},
};

ThemeToggler.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(ThemeToggler);
