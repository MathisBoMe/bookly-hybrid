const router = require("express").Router();
const ctrl = require("../controllers/userController");

router.get("/", ctrl.listUsers);
router.post("/", ctrl.createUser);

module.exports = router;