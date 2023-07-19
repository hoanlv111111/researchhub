const router = require("express").Router();
const publicationCtrl = require("../controllers/publicationCtrl");
const auth = require("../middleware/auth");

router.route("/publication")
    .post(auth, publicationCtrl.createPublication)
    .get(auth, publicationCtrl.getPublication);

router.route("/publication/:id")
    .patch(auth, publicationCtrl.updatePublication)
    .get(auth, publicationCtrl.getPublication)
    .delete(auth, publicationCtrl.deletePublication);

router.get("/user_publications/:id", auth, publicationCtrl.getUserPublications);

module.exports = router;
