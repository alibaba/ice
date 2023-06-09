export function withSuspense(cpt) {
  return cpt;
}

// TODO: 小程序场景下仅为套壳函数，暂不支持 useSuspenseData
export function useSuspenseData(request) {
  console.warn('miniapp-runtime does not support `useSuspenseData` api yet.');
  return request;
}
