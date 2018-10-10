/**
 * this delete a data key in current block type
 *
 * @param {Slate.state} state
 * @param {Datakey} dataKey
 * @return {Slate.state}
 **/
export default (change, dataKey) => {
  const { value } = change;
  const { blocks } = value;

  // if have blocks
  if (blocks) {
    blocks.forEach(type => {
      const typeOriginalData = type.get('data');
      const newData = typeOriginalData.delete(dataKey);

      const newType = type.set('data', newData);
      // reset current type with new data
      change.setBlocks(newType);
    });
  }

  return change;
};
