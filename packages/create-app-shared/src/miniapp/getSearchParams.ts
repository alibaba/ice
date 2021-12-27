import { getHistory } from '../storage';

export default function(history = getHistory()) {
  return (history?.location as any)?._currentPageOptions || {};
}
