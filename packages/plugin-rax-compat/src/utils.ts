import type { NormalizedRaxCompatPluginOptions, StyleKind } from './typings';

export const checkInlineStyleEnable = (
  id: string,
  inlineStyleFiler: NormalizedRaxCompatPluginOptions['inlineStyle'],
) => {
  return typeof inlineStyleFiler === 'function' ? inlineStyleFiler(id) : inlineStyleFiler;
};

export const checkInlineStyleDisable = (
  id: string,
  inlineStyleFiler: NormalizedRaxCompatPluginOptions['inlineStyle'],
) => {
  return typeof inlineStyleFiler === 'function' ? inlineStyleFiler(id) : inlineStyleFiler;
};

export const checkStyleKind = (path: string): StyleKind => {
  if (path.endsWith('.less')) {
    return 'less';
  }

  if (path.endsWith('.sass') || path.includes('.scss')) {
    return 'sass';
  }

  return 'css';
};
