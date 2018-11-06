import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
  text: PropTypes.string.isRequired, // 显示的文案
  img: PropTypes.string.isRequired, // 显示的图片链接
};

const Bar = (props) => {
  const { text, img } = props;
  const cls = classnames({
    bar: true,
  });
  return (
    <div className={cls}>
      <div className="bar-body">
        <img src={getLink(img)} className="front-img" />
        <span>{text}</span>
        <img src={getLink(img)} className="back-img" />
      </div>
    </div>
  );
};

Bar.propTypes = propTypes;

export default Bar;
