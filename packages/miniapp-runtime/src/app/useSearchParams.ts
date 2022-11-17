import { Current } from '../current.js';

export default function useSearchParams() {
  const searchParams = Current.router.params;
  const setSearchParams = () => {
    console.warn('setSearchParams is not implemented in miniapp');
  };
  return [
    searchParams,
    setSearchParams,
  ] as const;
}
