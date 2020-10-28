const express = require("express");
const districtController = require("./../controllers/districtController");

const router = express.Router();

router
  .route("/")
  .post(districtController.createDistrict)
  .get(districtController.getAllDistricts);

router
  .get("/:id")
  .get(districtController.getDistrict)
  .patch(districtController.updateDistrict);
module.exports = router;
