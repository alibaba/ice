import { useContext } from '@midwayjs/hooks';

/**
 * 获取请求 Method（GET/POST）
 * Hooks 概览：https://yuque.antfin.com/one-serverless/ali-serverless/hooks_syntax
 */
export function useMethod() {
  const { method } = useContext();
  return method;
}
