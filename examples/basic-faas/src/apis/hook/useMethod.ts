import { useContext } from '@midwayjs/hooks';

export function useMethod() {
  const { method } = useContext();
  return method;
}
