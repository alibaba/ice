'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _slateReact = require('slate-react');

var _slate = require('slate');

var _isHotkey = require('is-hotkey');

var _slatePlainSerializer = require('slate-plain-serializer');

var _slatePlainSerializer2 = _interopRequireDefault(_slatePlainSerializer);

require('./RichEditor.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 当前富文本组件使用了 Slate 详细文档请参见 https://docs.slatejs.org/

var DEFAULT_NODE = 'paragraph';
var isBoldHotkey = (0, _isHotkey.isKeyHotkey)('mod+b');
var isItalicHotkey = (0, _isHotkey.isKeyHotkey)('mod+i');
var isUnderlinedHotkey = (0, _isHotkey.isKeyHotkey)('mod+u');
var isCodeHotkey = (0, _isHotkey.isKeyHotkey)('mod+`');

var RichEditor = (_temp = _class = function (_Component) {
  _inherits(RichEditor, _Component);

  function RichEditor(props) {
    _classCallCheck(this, RichEditor);

    // 加载初始数据，通常从接口中获取或者默认为空
    var _this = _possibleConstructorReturn(this, (RichEditor.__proto__ || Object.getPrototypeOf(RichEditor)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      value: props.value ? _slate.Value.fromJSON(props.value) : _slatePlainSerializer2.default.deserialize('')
    };
    return _this;
  }

  // 摁下快捷键之后，设置当前选中文本要切换的富文本类型


  // 标记当前选中文本


  // 切换当前 block 类型


  // 配置 block type 对应在富文本里面的渲染组件


  // 配置 mark 对应在富文本里面的渲染组件


  _createClass(RichEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'rich-editor' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'rich-editor-menu rich-editor-toolbar-menu' },
              this.renderMarkButton('bold', 'format_bold'),
              this.renderMarkButton('italic', 'format_italic'),
              this.renderMarkButton('underlined', 'format_underlined'),
              this.renderMarkButton('code', 'code'),
              this.renderBlockButton('heading-one', 'looks_one'),
              this.renderBlockButton('heading-two', 'looks_two'),
              this.renderBlockButton('block-quote', 'format_quote'),
              this.renderBlockButton('numbered-list', 'format_list_numbered'),
              this.renderBlockButton('bulleted-list', 'format_list_bulleted')
            ),
            _react2.default.createElement(
              'div',
              { className: 'rich-editor-body' },
              _react2.default.createElement(_slateReact.Editor, {
                style: styles.editor,
                placeholder: '\u8BF7\u7F16\u5199\u4E00\u4E9B\u5185\u5BB9...',
                value: this.state.value,
                onChange: this.onChange,
                onKeyDown: this.onKeyDown,
                renderNode: this.renderNode,
                renderMark: this.renderMark,
                spellCheck: true
              })
            )
          )
        )
      );
    }
  }]);

  return RichEditor;
}(_react.Component), _class.displayName = 'RichEditor', _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.hasMark = function (type) {
    var value = _this2.state.value;

    return value.activeMarks.some(function (mark) {
      return mark.type === type;
    });
  };

  this.hasBlock = function (type) {
    var value = _this2.state.value;

    return value.blocks.some(function (node) {
      return node.type === type;
    });
  };

  this.onChange = function (_ref) {
    var value = _ref.value;

    _this2.setState({ value: value });
    // 如果上层有传递 onChange 回调，则应该传递上去
    if (_this2.props.onChange && typeof _this2.props.onChange === 'function') {
      _this2.props.onChange(value.toJSON());
    }
  };

  this.onKeyDown = function (event, change) {
    var mark = void 0;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  this.onClickMark = function (event, type) {
    event.preventDefault();
    var value = _this2.state.value;

    var change = value.change().toggleMark(type);
    _this2.onChange(change);
  };

  this.onClickBlock = function (event, type) {
    event.preventDefault();
    var value = _this2.state.value;

    var change = value.change();
    var document = value.document;


    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      var isActive = _this2.hasBlock(type);
      var isList = _this2.hasBlock('list-item');

      if (isList) {
        change.setBlock(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      var _isList = _this2.hasBlock('list-item');
      var isType = value.blocks.some(function (block) {
        return !!document.getClosest(block.key, function (parent) {
          return parent.type === type;
        });
      });

      if (_isList && isType) {
        change.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
      } else if (_isList) {
        change.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
      } else {
        change.setBlock('list-item').wrapBlock(type);
      }
    }

    _this2.onChange(change);
  };

  this.renderMarkButton = function (type, icon) {
    var isActive = _this2.hasMark(type);
    var onMouseDown = function onMouseDown(event) {
      return _this2.onClickMark(event, type);
    };

    return _react2.default.createElement(
      'span',
      { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive },
      _react2.default.createElement(
        'span',
        { className: 'material-icons' },
        icon
      )
    );
  };

  this.renderBlockButton = function (type, icon) {
    var isActive = _this2.hasBlock(type);
    var onMouseDown = function onMouseDown(event) {
      return _this2.onClickBlock(event, type);
    };

    return _react2.default.createElement(
      'span',
      { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive },
      _react2.default.createElement(
        'span',
        { className: 'material-icons' },
        icon
      )
    );
  };

  this.renderNode = function (props) {
    var attributes = props.attributes,
        children = props.children,
        node = props.node;

    switch (node.type) {
      case 'block-quote':
        return _react2.default.createElement(
          'blockquote',
          attributes,
          children
        );
      case 'bulleted-list':
        return _react2.default.createElement(
          'ul',
          attributes,
          children
        );
      case 'heading-one':
        return _react2.default.createElement(
          'h1',
          attributes,
          children
        );
      case 'heading-two':
        return _react2.default.createElement(
          'h2',
          attributes,
          children
        );
      case 'list-item':
        return _react2.default.createElement(
          'li',
          attributes,
          children
        );
      case 'numbered-list':
        return _react2.default.createElement(
          'ol',
          attributes,
          children
        );
      default:
        return _react2.default.createElement(
          'div',
          attributes,
          children
        );
    }
  };

  this.renderMark = function (props) {
    var children = props.children,
        mark = props.mark;

    switch (mark.type) {
      case 'bold':
        return _react2.default.createElement(
          'strong',
          null,
          children
        );
      case 'code':
        return _react2.default.createElement(
          'code',
          null,
          children
        );
      case 'italic':
        return _react2.default.createElement(
          'em',
          null,
          children
        );
      case 'underlined':
        return _react2.default.createElement(
          'u',
          null,
          children
        );
      default:
        return _react2.default.createElement(
          'span',
          null,
          children
        );
    }
  };
}, _temp);
exports.default = RichEditor;


var styles = {
  editor: {
    minHeight: 200
  }
};
module.exports = exports['default'];