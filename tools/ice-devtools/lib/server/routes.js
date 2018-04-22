const Router = require('koa-router');
const materialsListCtrl = require('./controllers/materialList');
const blockCtrl = require('./controllers/block');
const layoutCtrl = require('./controllers/layout');
const homeCtrl = require('./controllers/home');

const router = new Router();

router.get('/', homeCtrl);
router.get('/:material', materialsListCtrl);
router.get('/:material/block/:blockName', blockCtrl);
router.get('/:material/layout/:layoutName', layoutCtrl);

module.exports = router.routes();
