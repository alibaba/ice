import store from './store';

function useRole() {
  return store.useModel('role');
}

export {
  useRole
}
