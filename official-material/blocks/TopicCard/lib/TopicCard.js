import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

var dataSource = [{
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1nQ4hgILJ8KJjy0FnXXcFDpXa-132-126.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1OuuTgL6H8KJjy0FjXXaXepXa-132-126.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1aTaIgRTH8KJjy0FiXXcRsXXa-132-123.png'
}, {
  meta: '话题曝光',
  total: '56799',
  up: '100',
  down: '100',
  icon: '//img.alicdn.com/tfs/TB1dTaIgRTH8KJjy0FiXXcRsXXa-120-120.png'
}];

var TopicCard = (_temp = _class = function (_Component) {
  _inherits(TopicCard, _Component);

  function TopicCard() {
    _classCallCheck(this, TopicCard);

    return _possibleConstructorReturn(this, (TopicCard.__proto__ || _Object$getPrototypeOf(TopicCard)).apply(this, arguments));
  }

  _createClass(TopicCard, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'topic-card' },
        React.createElement(
          IceContainer,
          { title: '\u6570\u636E\u6982\u89C8' },
          React.createElement(
            'div',
            { style: styles.items },
            dataSource.map(function (item, idx) {
              return React.createElement(
                'div',
                {
                  style: styles.item,
                  className: 'topic-card-item',
                  key: 'card-item-' + idx
                },
                React.createElement(
                  'div',
                  { style: styles.cover },
                  React.createElement('img', { alt: 'icon', src: item.icon, style: styles.icon })
                ),
                React.createElement(
                  'div',
                  { style: styles.body },
                  React.createElement(
                    'div',
                    { style: styles.meta },
                    item.meta
                  ),
                  React.createElement(
                    'div',
                    { style: styles.total },
                    item.total
                  ),
                  React.createElement(
                    'div',
                    { style: styles.compareText },
                    '\u8F83\u524D\u65E5 ',
                    React.createElement(
                      'span',
                      { style: styles.up },
                      ' \u2191 +',
                      item.up
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: styles.compareText },
                    '\u8FD17\u5929 ',
                    React.createElement(
                      'span',
                      { style: styles.down },
                      ' \u2193 -',
                      item.down
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return TopicCard;
}(Component), _class.displayName = 'TopicCard', _temp);
export { TopicCard as default };


var styles = {
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0'
  },
  cover: {
    backgroundColor: '#e9f1ff',
    marginRight: '10px',
    height: '70px',
    width: '70px',
    borderRadius: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '44px',
    height: '40px'
  },
  meta: {
    fontSize: '12px',
    color: '#333333'
  },
  total: {
    fontSize: '24px',
    color: '#333333'
  },
  compareText: {
    fontSize: '12px',
    color: '#999999'
  },
  up: {
    color: '#fc5848'
  },
  down: {
    color: '#64d874'
  }
};