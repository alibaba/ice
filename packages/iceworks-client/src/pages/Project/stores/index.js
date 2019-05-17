import Icestore from 'icestore';
import pages from './pages';
import dependencies from './dependencies';
import layouts from './layouts';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('dependencies', dependencies);
icestore.registerStore('layouts', layouts);

export default icestore;
