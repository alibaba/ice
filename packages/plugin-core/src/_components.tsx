// 该文件仅用于 module.tsx 中引用 $ice/components 的编译问题
interface IProps {
  children?: any;
  Fallback?: any;
  onError?: Function;
};

// eslint-disable-next-line
export const ErrorBoundary = ({Fallback, onError, children}: IProps) => Fallback;
