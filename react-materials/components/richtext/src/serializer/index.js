import mark from './markRules';
import block from './blockRules';
import inline from './inlineRules';
import BLOCKS from '../constants/blocks';
import MARKS from '../constants/marks';
import INLINES from '../constants/inlines';

export const markRules = mark;
export const blockRules = block;
export const inlineRules = inline;

export const DEFAULT_RULES = [
  blockRules('p', BLOCKS.PARAGRAPH),
  blockRules('blockquote', BLOCKS.BLOCKQUOTE),
  blockRules('h1', BLOCKS.HEADING_1),
  blockRules('h2', BLOCKS.HEADING_2),
  blockRules('h3', BLOCKS.HEADING_3),
  blockRules('h4', BLOCKS.HEADING_4),
  blockRules('h5', BLOCKS.HEADING_5),
  blockRules('h6', BLOCKS.HEADING_6),
  blockRules('ul', BLOCKS.UL_LIST),
  blockRules('ol', BLOCKS.OL_LIST),
  blockRules('li', BLOCKS.LIST_ITEM),
  blockRules('table', BLOCKS.TABLE),
  blockRules('tr', BLOCKS.TABLE_ROW),
  blockRules('td', BLOCKS.TABLE_CELL),
  inlineRules('a', INLINES.LINK),
  markRules('strong', MARKS.BOLD),
  markRules('i', MARKS.ITALIC),
  markRules('s', MARKS.STRIKETHROUGH),
  markRules('u', MARKS.UNDERLINE),
  markRules('span', MARKS.FONTCOLOR),
  markRules('span', MARKS.FONTBGCOLOR),
  markRules('span', MARKS.FONTSIZE),
];
