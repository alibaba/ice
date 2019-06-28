import Icestore from 'icestore';
import configuration from './configuration';

const icestore = new Icestore();
icestore.registerStore('configuration', configuration);

export default icestore;
