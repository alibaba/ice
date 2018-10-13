import React, {Component} from 'react';
import Html from 'slate-html-serializer';
import { Editor, getEventTransfer } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import insertImages from 'slate-drop-or-paste-images';
import flatten from 'lodash.flatten';
import plugins from './plugins';
import BLOCK_TAGS from './constants/blocks';
import Image from './components/Image';
import ToolbarButton from './components/ToolbarButton';
import SERIALIZER_RULES from './serializer';
import {haveActiveMarks, haveBlocks} from './queries/have';
import './main.scss';


/**
 * Create a new HTML serializer
 *
 * @type {Html}
 */

const serializer = new Html({ rules: SERIALIZER_RULES });

/**
 * Richtext
 *
 * @type {Component}
 */

class RichText extends Component {

  constructor(props) {
    super(props);

    const customPlugins = flatten(
      plugins
        .map(plugin => plugin.plugins)
        .filter(plugin => plugin)
    );

    // Add the plugin to your set of plugins...
    this.plugins = [
      insertImages({
        insertImage: (transform, file) => {
          return transform.insertBlock({
            type: 'image',
            isVoid: true,
            data: { file }
          });
        }
      }),
    ].concat(customPlugins);

  }

  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: serializer.deserialize(this.props.value)
  }

  /**
   * The editor's schema.
   *
   * @type {Object}
   */

  schema = {
    blocks: {
      image: {
        isVoid: true,
      },
    },
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const {value} = this.state;
    const pluginToolbarButtons = flatten(
      plugins
        .map(plugin => plugin.toolbarButtons)
        .filter(buttons => buttons)
    );
    return (
      <div className="ice-richtext-container">
        <div className="ice-richtext-toolbar">
          {this.renderMarkButton('bold', 'format_bold', '粗体')}
          {this.renderMarkButton('italic', 'format_italic', '斜体')}
          {this.renderMarkButton('underline', 'format_underline', '下划线')}
          {this.renderMarkButton('strikethrough', 'format_strikethrough', '删除线')}
          {this.renderMarkButton('code', 'code', '代码')}
          {this.renderBlockButton('heading-one', 'looks_one', '1级标题')}
          {this.renderBlockButton('heading-two', 'looks_two', '2级标题')}
          {this.renderBlockButton('heading-three', 'looks_3', '3级标题')}
          {this.renderBlockButton('heading-four', 'looks_4', '4级标题')}
          {this.renderBlockButton('blockquote', 'format_quote', '引用')}
          {this.renderBlockButton('numbered-list', 'format_list_numbered', '有序列表')}
          {this.renderBlockButton('bulleted-list', 'format_list_bulleted', '无序列表')}
          {pluginToolbarButtons.map((ToolbarButton, index) => {
            return (
              <ToolbarButton
                key={index}
                value={value}
                editor={this.editor}
              />
            );
          })}
        </div>

        <Editor
          spellCheck
          autoFocus
          value={this.state.value}
          schema={this.schema}
          onPaste={this.onPaste}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          plugins={this.plugins}
          ref={(editor) => {this.editor = editor;}}
        />
      </div>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon, title) => {
    const {value} = this.state;
    const isActive = haveActiveMarks({value}, type);

    return (
      <ToolbarButton
        icon={icon}
        title={title}
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      />
    );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon, title) => {
    const {value} = this.state;
    let isActive = haveBlocks({value}, type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      if (value.blocks.first()) {
        const parent = value.document.getParent(value.blocks.first().key);
        isActive = haveBlocks({value}, 'list-item') && parent && parent.type === type;
      }
    }

    return (
      <ToolbarButton
        icon={icon}
        title={title}
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      />
    );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, next) => {
    const { attributes, children, node, isFocused } = props;

    const style = {
      textAlign: node.data.get('align'),
      lineHeight: node.data.get('lineHeight')
    };

    switch (node.type) {
      case 'blockquote':
        return <blockquote {...attributes} style={style}>{children}</blockquote>;
      case 'code':
        return (
          <pre style={style}>
            <code {...attributes}>{children}</code>
          </pre>
        );
      case 'paragraph':
        return (
          <p {...props.attributes} className={node.data.get('className')} style={style}>
            {props.children}
          </p>
        );
      case 'bulleted-list':
        return <ul {...attributes} style={style}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes} style={style}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes} style={style}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes} style={style}>{children}</h3>;
      case 'heading-four':
        return <h4 {...attributes} style={style}>{children}</h4>;
      case 'heading-five':
        return <h5 {...attributes} style={style}>{children}</h5>;
      case 'heading-six':
        return <h6 {...attributes} style={style}>{children}</h6>;
      case 'list-item':
        return <li {...attributes} style={style}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes} style={style}>{children}</ol>;
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a href={href} {...attributes}>
            {children}
          </a>
        );
      }
      case 'image': {
        const src = node.data.get('src');
        return <Image src={src} selected={isFocused} {...props} />;
      }
      default:
        return next();
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, next) => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      case 'strikethrough':
        return <s {...attributes}>{children}</s>;
      default:
        return next();
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    // When the document changes, save the serialized HTML to Local Storage.
    if (value.document != this.state.value.document) {
      const string = serializer.serialize(value);
      this.props.onChange(string);
    }

    this.setState({ value });
  }

  /**
   * On paste, deserialize the HTML and then insert the fragment.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onPaste = (event, change) => {
    const transfer = getEventTransfer(event);
    if (transfer.type != 'html') return;
    const { document } = serializer.deserialize(transfer.html);
    change.insertFragment(document);
    return true;
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change, next) => {
    let mark;

    /**
     * Define hotkey matchers.
     *
     * @type {Function}
     */

    const isBoldHotkey = isKeyHotkey('mod+b');
    const isItalicHotkey = isKeyHotkey('mod+i');
    const isUnderlineHotkey = isKeyHotkey('mod+u');
    const isCodeHotkey = isKeyHotkey('mod+`');

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlineHotkey(event)) {
      mark = 'underline';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    change.toggleMark(mark);
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.change(change => {
      change.toggleMark(type);
    });
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();

    /**
     * Define the default node type.
     *
     * @type {String}
     */

    this.editor.change(change => {
      const DEFAULT_NODE = BLOCK_TAGS.p;

      const { value } = this.state;
      const { document } = value;

      // Handle everything but list buttons.
      if (type != 'bulleted-list' && type != 'numbered-list') {
        const isActive = haveBlocks(change, type);
        const isList = haveBlocks(change, 'list-item');

        if (isList) {
          change
            .setBlocks(isActive ? DEFAULT_NODE : type)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        } else {
          change.setBlocks(isActive ? DEFAULT_NODE : type);
        }
      } else {
        // Handle the extra wrapping required for list buttons.
        const isList = haveBlocks(change, 'list-item');
        const isType = value.blocks.some(block => {
          return !!document.getClosest(block.key, parent => parent.type == type);
        });

        if (isList && isType) {
          change
            .setBlocks(DEFAULT_NODE)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        } else if (isList) {
          change
            .unwrapBlock(
              type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
            )
            .wrapBlock(type);
        } else {
          change.setBlocks('list-item').wrapBlock(type);
        }
      }
    });
  }
}

/**
 * Export.
 */

export default RichText;
