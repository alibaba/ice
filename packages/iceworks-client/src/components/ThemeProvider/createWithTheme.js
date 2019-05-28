/* eslint arrow-parens:0 */
import React from 'react';

export default (ThemeContext) => (WrapComponent) => (props) => (
  <ThemeContext.Consumer>
    {(theme) => <WrapComponent {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
