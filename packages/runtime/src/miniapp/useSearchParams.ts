import { Current } from '@ice/miniapp-runtime';

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
