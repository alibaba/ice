import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import { withTheme } from '@components/ThemeProvider';
import styles from './index.module.scss';

const ThemeToggler = ({ theme }) => {
  const { toggleTheme } = theme;
  return (
    <div key="xx" className={styles.themeToggler} onClick={toggleTheme}>
      <Icon type="projects" size="small" />
      主题
    </div>
  );
};

ThemeToggler.defaultProps = {
  theme: {},
};

ThemeToggler.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(ThemeToggler);
