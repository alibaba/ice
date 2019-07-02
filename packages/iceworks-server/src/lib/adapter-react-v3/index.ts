/**
 * icescripts 2.0 + kit 3.0
 */
import getBaseAdapter from '../adapter';

export default (i18n) => {
  const baseAdapter = getBaseAdapter(i18n);

  return {
    ...baseAdapter
  };
};
