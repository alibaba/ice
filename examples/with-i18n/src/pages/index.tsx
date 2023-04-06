import { Link } from 'ice';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <div>
      <h1>I18n Example</h1>
      <Link to="/blog">Blog</Link>
      <br />
      <button style={{ marginTop: 20 }}>
        <FormattedMessage id="buttonText" />
      </button>
    </div>
  );
}
