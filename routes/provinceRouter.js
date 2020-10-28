const express = require("express");
const provinceController = require("./../controllers/provinceController");
const countryController = require("./../controllers/countryController");

const router = express.Router();

router
  .route("/")
  .post(provinceController.createProvince)
  .get(provinceController.getAllProvinces);

router
  .route("/:id")
  .get(provinceController.getProvince)
  .patch(provinceController.updateProvince, countryController.updateCountry);
module.exports = router;
