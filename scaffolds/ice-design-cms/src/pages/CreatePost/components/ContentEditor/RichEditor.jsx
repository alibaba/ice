import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import Plain from 'slate-plain-serializer';

import './RichEditor.scss';

// 当前富文本组件使用了 Slate 详细文档请参见 https://docs.slatejs.org/

const DEFAULT_NODE = 'paragraph';
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

export default class RichEditor extends Component {
  static displayName = 'RichEditor';

  constructor(props) {
    super(props);

    // 加载初始数据，通常从接口中获取或者默认为空
    this.state = {
      value: props.value ? Value.fromJSON(props.value) : Plain.deserialize(''),
    };
  }

  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onChange = ({ value }) => {
    this.setState({ value });
    // 如果上层有传递 onChange 回调，则应该传递上去
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.props.onChange(value.toJSON());
    }
  };

  // 摁下快捷键之后，设置当前选中文本要切换的富文本类型
  onKeyDown = (event, change) => {
    let mark;

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

  // 标记当前选中文本
  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  // 切换当前 block 类型
  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some((block) => {
        return !!document.getClosest(
          block.key,
          parent => parent.type === type,
        );
      });

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
          )
          .wrapBlock(type);
      } else {
        change.setBlock('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type);
    const onMouseDown = event => this.onClickBlock(event, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  // 配置 block type 对应在富文本里面的渲染组件
  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return <div {...attributes}>{children}</div>;
    }
  };

  // 配置 mark 对应在富文本里面的渲染组件
  renderMark = (props) => {
    const { children, mark } = props;
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>;
      case 'code':
        return <code>{children}</code>;
      case 'italic':
        return <em>{children}</em>;
      case 'underlined':
        return <u>{children}</u>;
      default:
        return <span>{children}</span>;
    }
  };

  render() {
    return (
      <div className="rich-editor">
        <IceContainer>
          <div>
            <div className="rich-editor-menu rich-editor-toolbar-menu">
              {this.renderMarkButton('bold', 'format_bold')}
              {this.renderMarkButton('italic', 'format_italic')}
              {this.renderMarkButton('underlined', 'format_underlined')}
              {this.renderMarkButton('code', 'code')}
              {this.renderBlockButton('heading-one', 'looks_one')}
              {this.renderBlockButton('heading-two', 'looks_two')}
              {this.renderBlockButton('block-quote', 'format_quote')}
              {this.renderBlockButton('numbered-list', 'format_list_numbered')}
              {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            </div>
            <div className="rich-editor-body">
              <Editor
                style={styles.editor}
                placeholder="请编写一些内容..."
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
                spellCheck
              />
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  editor: {
    minHeight: 200,
  },
};
