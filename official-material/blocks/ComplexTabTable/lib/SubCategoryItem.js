import _Object$assign from 'babel-runtime/core-js/object/assign';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint no-unused-expressions: 0 */
import React from 'react';

var categoryStyle = {
  display: 'inline-block',
  marginRight: '12px',
  padding: '0 20px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  borderRadius: '100px',
  cursor: 'pointer',
  fontSize: '12px',
  marginTop: '12px'
};

export default (function (props) {
  return React.createElement(
    'span',
    {
      style: _extends({}, categoryStyle, {
        color: props.isCurrent ? '#fff' : '#666',
        backgroundColor: props.isCurrent ? '#3080FE' : '#f5f5f5'
      }),
      onClick: function onClick() {
        props.onItemClick && props.onItemClick(props.id);
      }
    },
    props.text
  );
});