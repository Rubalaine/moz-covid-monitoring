const express = require("express");
const countryController = require("./../controllers/countryController");

const router = express.Router();

router
  .route("/")
  .post(countryController.createCountry)
  .get(countryController.getAllCountry);

router
  .route("/:id")
  .get(countryController.getCountry)
  .patch(countryController.updateCountry);
module.exports = router;
