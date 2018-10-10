import BLOCK_TAGS from '../constants/blocks';
import MARK_TAGS from '../constants/marks';

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];
      let data = {};

      if (el.style) {
        if (el.style.textAlign) {
          data.align = el.style.textAlign;
        }

        if (el.style.lineHeight) {
          data.lineHeight = el.style.lineHeight;
        }
      }

      if (Object.keys(data).length > 0) {
        return {
          object: 'block',
          type: block,
          data,
          nodes: next(el.childNodes)
        };
      }

      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        const style = {
          textAlign: obj.data.get('align'),
          lineHeight: obj.data.get('lineHeight')
        };
        switch (obj.type) {
          case 'code':
            return (
              <pre style={style}>
                <code>{children}</code>
              </pre>
            );
          case 'paragraph':
            return <p className={obj.data.get('className')} style={style}>{children}</p>;
          case 'blockquote':
            return <blockquote style={style}>{children}</blockquote>;
          case 'bulleted-list':
            return <ul style={style}>{children}</ul>;
          case 'heading-one':
            return <h1 style={style}>{children}</h1>;
          case 'heading-two':
            return <h2 style={style}>{children}</h2>;
          case 'heading-three':
            return <h3 style={style}>{children}</h3>;
          case 'heading-four':
            return <h4 style={style}>{children}</h4>;
          case 'heading-five':
            return <h5 style={style}>{children}</h5>;
          case 'heading-six':
            return <h6 style={style}>{children}</h6>;
          case 'list-item':
            return <li style={style}>{children}</li>;
          case 'numbered-list':
            return <ol style={style}>{children}</ol>;
          case 'image':
            const src = obj.data.get('src');
            return <Image src={src} style={style} />;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];
      let data = {};

      if (el.style) {
        if (el.style.backgroundColor) {
          data.color = el.style.backgroundColor;
        }

        if (el.style.color) {
          data.color = el.style.color;
        }

        if (el.style.fontSize) {
          data.fontSize = el.style.fontSize;
        }
      }

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          data,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          case 'strikethrough':
            return <s>{children}</s>;
          case 'code':
            return <code>{children}</code>;
          case 'fontColor':
            return (
              <span style={{color: obj.data.get('color').color}}>
                {children}
              </span>
            );
          case 'fontBgColor':
            return (
              <span style={{backgroundColor: obj.data.get('color').color}}>
                {children}
              </span>
            );
          case 'fontSize':
            return (
              <span style={{fontSize: obj.data.get('fontSize')}}>
                {children}
              </span>
            );
        }
      }
    },
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'pre') {
        const code = el.childNodes[0];
        const childNodes =
          code && code.tagName.toLowerCase() == 'code'
            ? code.childNodes
            : el.childNodes;

        return {
          object: 'block',
          type: 'code',
          nodes: next(childNodes),
        };
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
        };
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
        };
      }
    },
  },
];

export default RULES;
