import { AppLink } from '@ice/stark-app';

export default function FrameworkLayout({ children }) {
  return (
    <>
      <ul>
        <li><AppLink to="/seller">seller 应用</AppLink></li>
        <li><AppLink to="/waiter">waiter 应用</AppLink></li>
        <li><AppLink to="/">主应用</AppLink></li>
      </ul>
      <div>
        {children}
      </div>
    </>
  );
}
