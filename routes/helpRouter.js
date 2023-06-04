const router = require("express").Router()
const helpCtrl = require("../controllers/helpCtrl")

router.post("/help-create", helpCtrl.createHelp)

router.get("/help", helpCtrl.getHelps)

router.get("/help/:id", helpCtrl.getHelp)

router.patch("/help/:id", helpCtrl.updateHelp)

router.delete("/help/:id", helpCtrl.deleteHelp)

module.exports = router