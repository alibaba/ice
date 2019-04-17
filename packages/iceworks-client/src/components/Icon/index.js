import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const fontFamily = 'iceworks';
const prefix = 'iceworks';

// icon url: http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=568722&keyword=
const Icon = ({
  className, size, type, ...other
}) => {
  const classes = cx({
    [`${fontFamily}`]: true,
    [`${prefix}-${size}`]: !!size,
    [`${prefix}-${type}`]: !!type,
    [className]: !!className,
  });
  return <i {...other} className={classes} />;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'xxs',
    'xs',
    'small',
    'medium',
    'large',
    'xl',
    'xxl',
    'xxxl',
  ]),
};

Icon.defaultProps = {
  size: 'medium',
  className: '',
};

export default Icon;
