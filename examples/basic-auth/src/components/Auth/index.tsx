function Auth({ children, hasAuth, fallback }) {
  if (hasAuth) {
    return children;
  } else {
    return fallback || null;
  }
};

export default Auth;
