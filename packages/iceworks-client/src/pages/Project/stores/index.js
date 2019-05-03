import Icestore from 'icestore';
import pages from './pages';
import dependencies from './dependencies';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('dependencies', dependencies);

export default icestore;
