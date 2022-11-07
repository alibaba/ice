import { useAuth } from 'ice';

function CustomAuth({ children, authKey, fallback }) {
  const [auth] = useAuth();
  // 判断是否有权限
  const hasAuth = auth[authKey];
  // 有权限时直接渲染内容
  if (hasAuth) {
    return children;
  } else {
    // 无权限时显示指定 UI
    return fallback || (<>No Auth</>);
  }
}

export default CustomAuth;
