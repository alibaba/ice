import { intl } from 'ice';

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <button>{intl.formatMessage({ id: 'new' })}</button>
    </>
  );
}
