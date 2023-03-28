import { defineAppConfig } from 'ice';
import moment from 'moment';

moment.locale('af');

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));
