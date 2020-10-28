const mongoose = require("mongoose");
const Province = require("./provinceModel");
const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    pandemyDays: Number,
    capital: String,
    population: Number,

    cases: {
      confirmed: Number,
      new: Number,
      recovered: Number,
      dead: Number,
      active: Number,
    },
    lastTimeUpdated: {
      type: Date,
      default: Date.now(),
    },
    provinces: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Province",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

countrySchema.pre(/^find/, function (next) {
  this.populate({
    path: "provinces",
    select: "-districts",
  });
  next();
});
const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
