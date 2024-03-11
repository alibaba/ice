import { KeepAliveOutlet } from 'ice';

export default function Layout() {
  return (
    <div>
      <h2>Layout</h2>
      <KeepAliveOutlet limit={2} paths={['/home']} />
    </div>
  );
}
