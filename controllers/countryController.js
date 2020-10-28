const Country = require("./../models/countryModel");
const Province = require("./../models/provinceModel");
const quueryFactory = require("./queryFactory");

exports.createCountry = quueryFactory.createOne(Country);
exports.getAllCountry = quueryFactory.getMany(Country);
exports.getCountry = quueryFactory.getOne(Country);
exports.updateCountry = async (request, response) => {
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
    { cases: docs[0] },
    { new: true, runValidators: true }
  );
  console.log(stat);
};
//quueryFactory.updateOne(Country);
// provinceSchema.post(/^findOneAnd/, async function () {
//   console.log(Country);
//   const docs = await Province.aggregate().group({
//     _id: null,
//     confirmed: { $sum: "$cases.confirmed" },
//     new: { $sum: "$cases.new" },
//     recovered: { $sum: "$cases.recovered" },
//     dead: { $sum: "$cases.dead" },
//     active: { $sum: "$cases.active" },
//   });
//   console.log(docs);
//   const stat = await Country.findOneAndUpdate(
//     { name: "Mozambique" },
//     { cases: docs[0] },
//     { new: true, runValidators: true }
//   );
//   console.log(stat);
// });
