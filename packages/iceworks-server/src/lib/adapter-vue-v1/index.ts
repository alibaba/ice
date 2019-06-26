import _ from 'lodash';

import baseAdapter from '../adapter';

import Configuration from './modules/configuration';
import Task from './modules/task';

const adapter = _.clone(baseAdapter);

adapter.Task.module = Task;
adapter.Configuration.module = Task;

export default adapter;
