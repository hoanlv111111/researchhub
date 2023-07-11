const router = require("express").Router()
const categoryCtrl = require("../controllers/categoryCtrl")
const auth = require("../middleware/auth")

router.route("/category")
    .post(auth, categoryCtrl.addPostToCategory)
    .get(auth, categoryCtrl.getCategories)

router.route("/category/:id")
    .patch(auth, categoryCtrl.updateCategory)
    .get(auth, categoryCtrl.getCategories)
    .delete(auth, categoryCtrl.deleteCategory)

router.get("/user_categories/:id", auth, categoryCtrl.getUserCategories)
module.exports = router