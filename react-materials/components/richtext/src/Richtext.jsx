'use strict';

import React, {Component} from 'react'
import Html from 'slate-html-serializer'
import { Editor, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import styled from 'react-emotion'
import { isKeyHotkey } from 'is-hotkey'
import { injectGlobal } from 'emotion'
import InsertImages from 'slate-drop-or-paste-images'
import flatten from 'lodash.flatten';
import ToolbarButton from './components/ToolbarButton';
import plugins from './plugins';

injectGlobal`
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
`

const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  font-size: 18px;
  vertical-align: text-bottom;
`

const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
}

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
}

/**
 * Image node renderer.
 *
 * @type {Component}
 */

class Image extends React.Component {
  state = {}

  componentDidMount() {
    const { node } = this.props
    const { data } = node
    const file = data.get('file')
    this.load(file)
  }

  load(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
  }

  render() {
    const { attributes, selected } = this.props
    const { src } = this.state
    return src ?
      <img
        {...attributes}
        src={src}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '20em',
          boxShadow: selected ? '0 0 0 2px blue' : 'none'
        }}
      /> :
      <span>Loading...</span>
  }
}

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]

      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        const style = { textAlign: obj.data.get('align') }
        switch (obj.type) {
          case 'code':
            return (
              <pre style={style}>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')} style={style}>{children}</p>
          case 'quote':
            return <blockquote style={style}>{children}</blockquote>
          case 'block-quote':
            return <blockquote style={style}>{children}</blockquote>
          case 'bulleted-list':
            return <ul style={style}>{children}</ul>
          case 'heading-one':
            return <h1 style={style}>{children}</h1>
          case 'heading-two':
            return <h2 style={style}>{children}</h2>
          case 'heading-three':
            return <h3 style={style}>{children}</h3>
          case 'heading-four':
            return <h4 style={style}>{children}</h4>
          case 'heading-five':
            return <h5 style={style}>{children}</h5>
          case 'heading-six':
            return <h6 style={style}>{children}</h6>
          case 'list-item':
            return <li style={style}>{children}</li>
          case 'numbered-list':
            return <ol style={style}>{children}</ol>
          case 'image':
            const src = obj.data.get('src')
            return <Image src={src} style={style}/>
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      let data = {};

      if (el.style.backgroundColor) {
        data.color = el.style.backgroundColor;
      }

      if (el.style.color) {
        data.color = el.style.color;
      }

      if (el.style.fontSize) {
        data.fontSize = el.style.fontSize;
      }

      if (el.style.letterSpacing) {
        data.letterSpacing = el.style.letterSpacing;
      }

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          data,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
          case 'code':
            return <code>{children}</code>
          case 'FONTCOLOR':
            const style = {color: obj.data.get('color')}
            return <span style={style}>{children}</span>
        }
      }
    },
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'pre') {
        const code = el.childNodes[0]
        const childNodes =
          code && code.tagName.toLowerCase() == 'code'
            ? code.childNodes
            : el.childNodes

        return {
          object: 'block',
          type: 'code',
          nodes: next(childNodes),
        }
      }
    },
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'img') {
        return {
          object: 'block',
          type: 'image',
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute('src'),
          },
        }
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'a') {
        return {
          object: 'inline',
          type: 'link',
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href'),
          },
        }
      }
    },
  },
]

/**
 * Create a new HTML serializer with `RULES`.
 *
 * @type {Html}
 */

const serializer = new Html({ rules: RULES })


/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

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
      InsertImages({
        insertImage: (transform, file) => {
          return transform.insertBlock({
            type: 'image',
            isVoid: true,
            data: { file }
          })
        }
      }),
    ].concat(customPlugins)

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
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type == type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type == type)
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
      <div>
        <Toolbar>
          {this.renderMarkButton('bold', 'format_bold')}
          {this.renderMarkButton('italic', 'format_italic')}
          {this.renderMarkButton('underlined', 'format_underlined')}
          {this.renderMarkButton('code', 'code')}
          {this.renderBlockButton('heading-one', 'looks_one')}
          {this.renderBlockButton('heading-two', 'looks_two')}
          {this.renderBlockButton('block-quote', 'format_quote')}
          {this.renderBlockButton('numbered-list', 'format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
          {pluginToolbarButtons.map((ToolbarButton, index) => {
            return (
              <ToolbarButton
                key={index}
                value={value}
                change={value.change()}
                onChange={this.onChange}
              />
            )
          })}
        </Toolbar>
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
        />
      </div>
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <ToolbarButton
        icon={icon}
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      />
    )
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state
      if (value.blocks.first()) {
        const parent = value.document.getParent(value.blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <ToolbarButton
        icon={icon}
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      />
    )
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, children, node, isFocused } = props

    const style = { textAlign: node.data.get('align') }

    switch (node.type) {
      case 'quote':
        return <blockquote {...attributes} style={style}>{children}</blockquote>
      case 'code':
        return (
          <pre style={style}>
            <code {...attributes}>{children}</code>
          </pre>
        )
      case 'paragraph':
        return (
          <p {...props.attributes} className={node.data.get('className')} style={style}>
            {props.children}
          </p>
        )
      case 'bulleted-list':
        return <ul {...attributes} style={style}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes} style={style}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes} style={style}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes} style={style}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes} style={style}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes} style={style}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes} style={style}>{children}</h6>
      case 'list-item':
        return <li {...attributes} style={style}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes} style={style}>{children}</ol>
      case 'link': {
        const { data } = node
        const href = data.get('href')
        return (
          <a href={href} {...attributes}>
            {children}
          </a>
        )
      }
      case 'image': {
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...props} />
      }
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = props => {
    const { children, mark, attributes } = props
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
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
      const string = serializer.serialize(value)
      this.props.onChange(string)
    }
    this.setState({ value })
  }

  /**
   * On paste, deserialize the HTML and then insert the fragment.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onPaste = (event, change) => {
    const transfer = getEventTransfer(event)
    if (transfer.type != 'html') return
    const { document } = serializer.deserialize(transfer.html)
    change.insertFragment(document)
    return true
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
    return true
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    }

    this.onChange(change)
  }
}

/**
 * Export.
 */

export default RichText
