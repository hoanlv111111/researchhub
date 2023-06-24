const router = require('express').Router();
const searchCtrl = require('../controllers/searchCtrl');
const auth = require('../middleware/auth');

router.get('/search', auth, searchCtrl);

module.exports = router;