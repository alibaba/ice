/**
 * this update current type with additional data, this could be useful in align...
 * */
import { Map } from 'immutable';

export default (change, { data }) => {
  const { value } = change;
  const blocks = value.blocks;

  // if have blocks
  if (blocks) {
    blocks.forEach((type) => {
      // eslint-disable-next-line
      const mapData = Map(data);
      // eslint-disable-next-line
      const originalDataAttr = type.get('data') || Map({});
      const newData = originalDataAttr.merge(mapData);
      const newType = type.set('data', newData);
      // reset current type with new data
      change.setBlocks(newType);
    });
  }

  return change;
};
