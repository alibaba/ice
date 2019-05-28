import Icestore from 'icestore';
import dev from './dev';

const icestore = new Icestore();
icestore.registerStore('dev', dev);

export default icestore;
