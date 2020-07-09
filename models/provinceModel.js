const mongoose = require("mongoose");
const slugify = require("slugify");
const District = require("./districtModel");
const Country = require("./countryModel");

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    capital: String,
    population: Number,
    slug: String,
    cases: {
      confirmed: Number,
      new: Number,
      recovered: Number,
      dead: Number,
      active: Number,
      per100k: Number,
    },
    lastTimeUpdated: {
      type: Date,
      default: Date.now(),
    },
    districts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "District",
      },
    ],
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
provinceSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.cases.active =
    this.cases.confirmed - (this.cases.recovered + this.cases.dead);
  next();
});
provinceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "districts",
    select: "-__v",
  });
  next();
});

// provinceSchema.post(/^findOneAnd/, function () {
//   this.cases.active =
//     this.cases.confirmed - (this.cases.recovered + this.cases.dead);
// });
const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
