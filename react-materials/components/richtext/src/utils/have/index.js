export const haveMarks = ({ value }, type) => {
  if (value.marks.size > 0) {
    return value.marks.some(mark => mark.type === type);
  }

  return false;
};

export const haveBlocks = ({ value }, type) => {
  if (value.blocks.size > 0) {
    return value.blocks.some(
      node => node.type === type || node.type.indexOf(`${type}`) === 0
    );
  }

  return false;
};

export const haveInlines = ({ value }, type) => {
  if (value.inlines.size > 0) {
    return value.inlines.some(inline => inline.type === type);
  }

  return false;
};

export const haveDataKeyInSomeBlocks = ({ value }, dataKey) => {
  if (value.blocks.size > 0) {
    return value.blocks.some(
      block => block.get('data').has(dataKey) && block.get('data').get(dataKey)
    );
  }

  return false;
};

export const haveDataKeyInSomeMarks = ({ value }, dataKey) => {
  if (value.marks.size > 0) {
    return value.marks.some(
      mark => mark.get('data').has(dataKey) && mark.get('data').get(dataKey)
    );
  }

  return false;
};

export const haveDataKeyEqualValueInSomeBlocks = (
  { value },
  dataKey,
  dataValue
) => {
  if (value.blocks.size > 0) {
    return value.blocks.some(
      block =>
        block.get('data').has(dataKey) &&
        block.get('data').get(dataKey) === dataValue
    );
  }

  return false;
};
