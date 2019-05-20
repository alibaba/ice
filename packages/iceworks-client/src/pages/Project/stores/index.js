import Icestore from 'icestore';
import pages from './pages';
import dependencies from './dependencies';
import layouts from './layouts';
import page from './page';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('dependencies', dependencies);
icestore.registerStore('layouts', layouts);
icestore.registerStore('page', page);

export default icestore;
