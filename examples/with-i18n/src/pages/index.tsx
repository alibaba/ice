import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <div>
      <h1>I18n Example</h1>
      <FormattedMessage id="buttonText" />
    </div>
  );
}