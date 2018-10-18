import React from 'react';

const DEFAULT_OPT = {
  getHref: (node) => node.data.get('href'),
};

export default function (Tag, inlineType, options = DEFAULT_OPT) {
  return {
    deserialize(el, next) {
      if (inlineType && el.tagName && el.tagName.toLowerCase() === Tag) {
        const data = {};

        if (el.href) {
          data.href = el.href;
        }
        return {
          object: 'inline',
          type: inlineType,
          data,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'inline' && obj.type === inlineType) {
        const href = options.getHref(obj);
        const props = {
          href,
        };

        return <Tag {...props}>{children}</Tag>;
      }
    },
  };
}
