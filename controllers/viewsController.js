const Country = require("./../models/countryModel");
const Province = require("./../models/provinceModel");
const District = require("./../models/districtModel");
const { request } = require("../app");

exports.getCountryStats = async (request, response) => {
  try {
    const ct = await Country.find();
    const country = ct[0];
    // console.log(country);
    response.status(200).render("home", {
      title: "Covid-19 em Mocambique",
      country,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getProvinceStats = async (request, response) => {
  try {
    if (!request.params.id === "ara.ara.69") throw new Error("Nao autorizado");
    const provinces = await Province.find();
    // console.log(country);
    response.status(200).render("editData", {
      title: "Admin Data editor",
      provinces,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getMe = async (request, response) => {
  try {
    response.status(200).render("about");
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
