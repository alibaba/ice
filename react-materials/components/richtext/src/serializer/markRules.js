import React from 'react';
import mapValues from 'lodash.mapvalues';
import MARKS from '../constants/marks';
import { markAttrs } from '../utils/getAttrs';

export default function(Tag, markType, stylesAttr = markAttrs) {
  return {
    deserialize(el, next) {
      if (markType && el.tagName && el.tagName.toLowerCase() === Tag) {
        let data = {};

        if (el.style.backgroundColor) {
          data.backgroundColor = el.style.backgroundColor;
        }

        if (el.style.color) {
          data.color = el.style.color;
        }

        if (el.style.fontSize) {
          data.fontSize = el.style.fontSize;
        }

        if (markType === MARKS.FONTCOLOR && !data.color) {
          return next();
        }
        if (markType === MARKS.FONTBGCOLOR && !data.backgroundColor) {
          return next();
        }
        if (markType === MARKS.FONTSIZE && !data.fontSize) {
          return next();
        }

        return {
          object: 'mark',
          type: markType,
          data,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark' && obj.type === markType) {
        return (
          <Tag style={mapValues(stylesAttr, val => val && val(obj))}>
            {children}
          </Tag>
        );
      }
    }
  };
}
