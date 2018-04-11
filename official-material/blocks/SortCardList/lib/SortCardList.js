import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var Row = _Grid.Row,
    Col = _Grid.Col;


var stateMap = {
  0: { color: '#F4F7FF', text: '未开始' },
  1: { color: '#FFFAE8', text: '进行中' },
  2: { color: '#EAFCF6', text: '完成' }
};

var SortCardList = (_temp = _class = function (_Component) {
  _inherits(SortCardList, _Component);

  function SortCardList(props) {
    _classCallCheck(this, SortCardList);

    var _this = _possibleConstructorReturn(this, (SortCardList.__proto__ || _Object$getPrototypeOf(SortCardList)).call(this, props));

    _this.handleFinish = function () {};

    _this.renderItem = function (item) {
      return React.createElement(
        'div',
        {
          style: _extends({}, styles.cardItem, {
            backgroundColor: stateMap[item.state].color
          }),
          key: item.id,
          draggable: true
        },
        React.createElement(
          'div',
          { style: styles.desc },
          item.description
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            null,
            React.createElement('img', {
              alt: 'icon',
              src: 'https://gw.alicdn.com/tfs/TB1b8vJjlTH8KJjy0FiXXcRsXXa-22-22.png',
              style: styles.icon
            }),
            item.datetime
          ),
          React.createElement(
            'span',
            { style: styles.done, onClick: _this.handleFinish },
            stateMap[item.state].text
          )
        )
      );
    };

    _this.state = {
      todos: [{
        id: 1,
        state: 0,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 2,
        state: 0,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 3,
        state: 0,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }],
      doings: [{
        id: 1,
        state: 1,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 2,
        state: 1,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 3,
        state: 1,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 4,
        state: 1,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }, {
        id: 5,
        state: 1,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }],
      dones: [{
        id: 2,
        state: 2,
        description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
        datetime: '07-07  18:36'
      }]
    };
    return _this;
  }

  // ICE: React Component 的生命周期

  _createClass(SortCardList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          todos = _state.todos,
          doings = _state.doings,
          dones = _state.dones;

      return React.createElement(
        'div',
        { className: 'sort-card-list' },
        React.createElement(
          IceContainer,
          { style: styles.cardContainer },
          React.createElement(
            Row,
            { wrap: true, gutter: 20 },
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8', style: styles.cardList },
              React.createElement(
                'div',
                { style: styles.title },
                '\u5F85\u529E\u4E8B\u9879'
              ),
              React.createElement(
                'div',
                { style: styles.subTitle },
                '\u5728\u4EFB\u52A1\u5361\u7247\u95F4\u62D6\u62FD\u6765\u6392\u5E8F'
              ),
              todos.map(this.renderItem)
            ),
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8', style: styles.cardList },
              React.createElement(
                'div',
                { style: styles.title },
                '\u8FDB\u884C\u4E2D'
              ),
              React.createElement(
                'div',
                { style: styles.subTitle },
                '\u5728\u4EFB\u52A1\u5361\u7247\u95F4\u62D6\u62FD\u6765\u6392\u5E8F'
              ),
              doings.map(this.renderItem)
            ),
            React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8', style: styles.cardList },
              React.createElement(
                'div',
                { style: styles.title },
                '\u5DF2\u5B8C\u6210'
              ),
              React.createElement(
                'div',
                { style: styles.subTitle },
                '\u5728\u4EFB\u52A1\u5361\u7247\u95F4\u62D6\u62FD\u6765\u6392\u5E8F'
              ),
              dones.map(this.renderItem)
            )
          )
        )
      );
    }
  }]);

  return SortCardList;
}(Component), _class.displayName = 'SortCardList', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { SortCardList as default };


var styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardList: {
    flex: 1
  },
  title: {
    fontSize: '16px',
    marginBottom: '10px'
  },
  subTitle: {
    fontSize: '12px',
    marginBottom: '10px'
  },
  cardItem: {
    height: '80px',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '10px 16px',
    position: 'relative'
  },
  icon: {
    width: '11px',
    height: '11px',
    marginRight: '5px'
  },
  desc: {
    fontSize: '12px',
    marginBottom: '10px',
    height: '36px',
    lineHeight: '18px',
    overflow: 'hidden'
  },
  done: {
    fontSize: '12px',
    position: 'absolute',
    right: '16px',
    bottom: '10px',
    cursor: 'pointer'
  }
};