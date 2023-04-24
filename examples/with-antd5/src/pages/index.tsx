import { DatePicker, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

export default function Index() {
  return (
    <div>
      <h2><FormattedMessage id="indexTitle" /></h2>
      <Pagination defaultCurrent={1} total={50} showSizeChanger />
      <DatePicker />
    </div>
  );
}
