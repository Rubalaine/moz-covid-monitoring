const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    population: Number,
    cases: {
      confirmed: Number,
      new: Number,
      serious: Number,
      recovered: Number,
      dead: Number,
      tested: Number,
      quarantained: Number,
      isolated: {
        home: Number,
        hospital: Number,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const District = mongoose.model("District", districtSchema);
module.exports = District;
