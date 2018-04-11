import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import Logo from './__components_Logo__';

var Footer = function (_PureComponent) {
  _inherits(Footer, _PureComponent);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || _Object$getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        Layout.Footer,
        {
          className: 'ice-design-layout-footer',
          style: {
            lineHeight: '36px'
          }
        },
        React.createElement(
          'div',
          { className: 'ice-design-layout-footer-body' },
          React.createElement(
            'div',
            { style: { filter: 'grayscale(100%)', opacity: 0.3 } },
            React.createElement(Logo, null)
          ),
          React.createElement(
            'div',
            { className: 'copyright' },
            '\xA9 2018 Theme designed by',
            ' ',
            React.createElement(
              'a',
              {
                href: 'https://github.com/alibaba/ice',
                target: '_blank',
                className: 'copyright-link',
                rel: 'noopener noreferrer'
              },
              'ICE'
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(PureComponent);

export { Footer as default };