import { useState, useEffect, useContext } from 'react';
import StoreContext from './StoreContext';

/**
 * Provide a useStore function to synchronize data to the global store
 * @param {function} cb callback
 */
function useStore(cb) {
  const [store, setStore] = useContext(StoreContext);
  const [data, setData] = useState(true);

  useEffect(() => {
    if (data) return;
    cb(setStore);
  }, [data]);

  return [store, setData];
}

export default useStore;
