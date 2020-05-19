import { useRole } from 'ice';

function Auth({ children, role = [] }) {
  const [currRole] = useRole();

  const hasAuth = currRole.filter(item => role.includes(item)).length

  if (hasAuth) {
    return children;
  } else {
    return null
  }
};

export default Auth;
