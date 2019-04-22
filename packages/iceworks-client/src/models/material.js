import { useStore } from '@store';

export function useMaterial() {
  return useStore((setStore) => {
    setTimeout(() => {
      const newData = { name: 'form model' };
      setStore(newData);
    }, 100);
  });
}
