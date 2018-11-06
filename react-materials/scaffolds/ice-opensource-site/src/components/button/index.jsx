import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
  type: PropTypes.oneOf(['primary', 'normal']),
  link: PropTypes.string,
  target: PropTypes.string,
};
const defaultProps = {
  type: 'primary',
  link: '',
  target: '_self',
};
const Button = (props) => {
  return (
    <a
      className={
        classnames({
          button: true,
          [`button-${props.type}`]: true,
        })
      }
      target={props.target || '_self'}
      href={getLink(props.link)}
    >
      {props.children}
    </a>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
