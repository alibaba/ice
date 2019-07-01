import Icestore from '@ice/store';
import task from './task';

const icestore = new Icestore();
icestore.registerStore('task', task);

export default icestore;
