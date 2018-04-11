import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceImg from '@icedesign/img';
import './SingleItem.scss';

var SingleItem = (_temp = _class = function (_Component) {
  _inherits(SingleItem, _Component);

  function SingleItem() {
    _classCallCheck(this, SingleItem);

    return _possibleConstructorReturn(this, (SingleItem.__proto__ || _Object$getPrototypeOf(SingleItem)).apply(this, arguments));
  }

  _createClass(SingleItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          active = _props.active,
          title = _props.title,
          image = _props.image,
          price = _props.price,
          extra = _props.extra;

      return React.createElement(
        'div',
        {
          className: className + ' single-item',
          style: _extends({}, style, {
            width: '165px',
            height: '230px',
            cursor: 'pointer',
            borderRadius: '4px',
            margin: '0 auto',
            backgroundColor: active ? '#f4f4f4' : undefined
          })
        },
        React.createElement(IceImg, {
          src: image,
          width: 149,
          height: 149,
          style: { margin: '8px' }
        }),
        React.createElement(
          'div',
          {
            style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#999',
              fontSize: '12px',
              lineHeight: '18px',
              margin: '0 14px'
            }
          },
          title
        ),
        React.createElement(
          'div',
          {
            style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#999',
              lineHeight: '18px',
              fontSize: '12px',
              margin: '0 14px'
            }
          },
          price
        ),
        React.createElement(
          'div',
          {
            style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              lineHeight: '18px',
              color: '#C0C0C0',
              fontSize: '12px',
              margin: '0 14px'
            }
          },
          extra
        )
      );
    }
  }]);

  return SingleItem;
}(Component), _class.displayName = 'SingleItem', _temp);
export { SingleItem as default };