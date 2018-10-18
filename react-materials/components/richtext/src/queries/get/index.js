export const getMarkType = ({ value }, type) => {
  if (value.marks.size > 0) {
    return value.marks.filter((mark) => mark.type === type);
  }
};

export const getBlockType = ({ value }, type) => {
  if (value.blocks.size > 0) {
    return value.blocks.filter((block) => block.type === type);
  }
};
