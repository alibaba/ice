const Router = require('koa-router');
const blockListCtrl = require('./controllers/blockList');
const blockCtrl = require('./controllers/block');

const router = new Router();

router.get('/:material/block', blockListCtrl);
router.get('/:material/block/:blockName', blockCtrl);

module.exports = router.routes();
