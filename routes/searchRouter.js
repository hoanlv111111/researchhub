const router = require('express').Router();
const searchCtrl = require('../controllers/searchCtrl');
const auth = require('../middleware/auth');

// router.get('/search?type=users', auth, searchCtrl.searchUser);
// router.get('/search?type=posts', auth, searchCtrl.searchPost);
router.get('/search', auth, searchCtrl);

module.exports = router;