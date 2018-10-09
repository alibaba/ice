import { whatMarkTypes } from '../../utils/what';
import { getMarkType } from '../../utils/get';

export default (change, options) => {
  const type = options.type;

  // if type exist, remove same type mark
  if (whatMarkTypes(change).has(type)) {
    getMarkType(change, type).forEach(mark => {
      change.removeMark(mark);
    });
  }

  return change.addMark(options).focus();
};
