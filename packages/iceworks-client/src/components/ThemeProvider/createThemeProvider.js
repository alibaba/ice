import React, { Component } from 'react';
import PropTypes from 'prop-types';

const createThemeProvider = ({ defaultTheme, ThemeContext, themes }) => {
  class ThemeProvider extends Component {
    static defaultProps = {
      theme: defaultTheme,
    };

    static propTypes = {
      theme: PropTypes.string,
      children: PropTypes.element.isRequired,
    };

    state = {
      theme: this.props.theme,
    };

    onToggleTheme = (theme) => {
      const newTheme = theme === themes.blue ? themes.purple : themes.blue;
      this.setState({
        theme: newTheme,
      });
    };

    render() {
      const { theme } = this.state;
      const { children } = this.props;
      return (
        <ThemeContext.Provider
          value={{
            theme,
            toggleTheme: () => this.onToggleTheme(theme),
          }}
        >
          {children}
        </ThemeContext.Provider>
      );
    }
  }

  return ThemeProvider;
};

export default createThemeProvider;
