import Icestore from 'icestore';
import pages from './pages';
import layouts from './layouts';
import page from './page';
import git from './git';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('layouts', layouts);
icestore.registerStore('page', page);
icestore.registerStore('git', git);

export default icestore;
