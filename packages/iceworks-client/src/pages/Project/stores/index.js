import Icestore from 'icestore';
import pages from './pages';
import layouts from './layouts';
import menu from './menu';
import routes from './routes';
import git from './git';
import oss from './oss';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('layouts', layouts);
icestore.registerStore('menu', menu);
icestore.registerStore('routes', routes);
icestore.registerStore('git', git);
icestore.registerStore('oss', oss);

export default icestore;
