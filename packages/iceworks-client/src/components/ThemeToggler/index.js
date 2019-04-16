import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import { withTheme } from '@components/ThemeProvider';

const ThemeToggler = ({ theme }) => {
  return <Button type="primary">主题: {theme}</Button>;
};

ThemeToggler.defaultProps = {
  theme: '',
};

ThemeToggler.propTypes = {
  theme: PropTypes.string,
};

export default withTheme(ThemeToggler);
