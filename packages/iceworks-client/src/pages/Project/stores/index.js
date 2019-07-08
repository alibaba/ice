import Icestore from '@ice/store';
import pages from './pages';
import layouts from './layouts';
import menu from './menu';
import routes from './routes';
import git from './git';
import oss from './oss';
import todo from './todo';

const icestore = new Icestore();
icestore.registerStore('pages', pages);
icestore.registerStore('layouts', layouts);
icestore.registerStore('menu', menu);
icestore.registerStore('routes', routes);
icestore.registerStore('git', git);
icestore.registerStore('oss', oss);
icestore.registerStore('todo', todo);

export default icestore;
