const express = require("express");
const viewsController = require("./../controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getCountryStats);
router.get("/admin/:id", viewsController.getProvinceStats);

module.exports = router;
