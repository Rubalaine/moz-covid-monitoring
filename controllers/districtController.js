const District = require("./../models/districtModel");
const queryFactory = require("./queryFactory");

exports.getAllDistricts = queryFactory.getMany(District);
exports.getDistrict = queryFactory.getOne(District);
exports.createDistrict = queryFactory.createOne(District);
exports.updateDistrict = queryFactory.updateOne(District);
