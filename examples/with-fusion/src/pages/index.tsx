import { Button, DatePicker } from '@alifd/next';
import '@alifd/next/dist/next.css';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <div>
      <h1>with fusion</h1>
      <DatePicker />
      <Button type="primary">
        <FormattedMessage id="buttonText" />
      </Button>
    </div>
  );
}