const Province = require("./../models/provinceModel");
const Country = require("./../models/countryModel");
const queryFactory = require("./queryFactory");

exports.getAllProvinces = queryFactory.getMany(Province);
exports.getProvince = queryFactory.getOne(Province);
exports.createProvince = queryFactory.createOne(Province);
exports.updateProvince = async (request, response) => {
  try {
    const doc = await Province.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc)
      return response.status(404).json({
        status: "fail",
        message: "no document found",
      });

    const docs = await Province.aggregate().group({
      _id: null,
      confirmed: { $sum: "$cases.confirmed" },
      new: { $sum: "$cases.new" },
      recovered: { $sum: "$cases.recovered" },
      dead: { $sum: "$cases.dead" },
      active: { $sum: "$cases.active" },
    });
    // console.log(docs);
    const stat = await Country.findOneAndUpdate(
      { name: "Mozambique" },
      { cases: docs[0], lastTimeUpdated: Date.now() },
      { new: true, runValidators: true }
    );
    // console.log(stat);

    response.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// exports.updateCountry = async (request, response) => {
//     const docs = await Province.aggregate().group({
//       _id: null,
//       confirmed: { $sum: "$cases.confirmed" },
//       new: { $sum: "$cases.new" },
//       recovered: { $sum: "$cases.recovered" },
//       dead: { $sum: "$cases.dead" },
//       active: { $sum: "$cases.active" },
//     });
//     console.log(docs);
//     const stat = await Country.findOneAndUpdate(
//       { name: "Mozambique" },
//       { cases: docs[0] },
//       { new: true, runValidators: true }
//     );
//     console.log(stat);
//   };
