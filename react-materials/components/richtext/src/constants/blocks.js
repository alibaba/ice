/**
 * Map of all block types. Blocks can contain inlines or blocks.
 * @type {Map}
 */

module.exports = {
  DOCUMENT: "document",
  TEXT: "unstyled",
  // Classic blocks
  CODE: "code_block",
  CODE_LINE: "code_line",
  BLOCKQUOTE: "blockquote",
  PARAGRAPH: "paragraph",
  FOOTNOTE: "footnote",
  HTML: "html_block",
  HR: "hr",
  // Headings
  HEADING_1: "heading_one",
  HEADING_2: "heading_two",
  HEADING_3: "heading_three",
  HEADING_4: "heading_four",
  HEADING_5: "heading_five",
  HEADING_6: "heading_six",
  // Lists
  OL_LIST: "ordered_list",
  UL_LIST: "unordered_list",
  LIST_ITEM: "list_item",

  // Default block
  DEFAULT: "paragraph",

  // Special
  IMAGE: "image",
  VIDEO: "video"
};
