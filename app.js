const express = require("express");
const app = express();
const path = require("path");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const morgan = require("morgan");
const countryRouter = require("./routes/countryRouter");
const districtRouter = require("./routes/districtRouter");
const provinceRouter = require("./routes/provinceRouter");
const viewRouter = require("./routes/viewRouter");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
// app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use("/", viewRouter);
app.use("/covid-api/moz/country", countryRouter);
app.use("/covid-api/moz/province", provinceRouter);
//app.use("/covid-api/moz/district", districtRouter);
app.all("*", (request, response) => {
  response.status(404).json({
    status: "fail",
    message: `Can find ${request.originalUrl} on this server`,
  });
  // const error = new Error(`Can find ${request.originalUrl} on this server`);
  // error.status = 'fail';
  // error.statusCode = 404;
  // next(new AppError(`Can find ${request.originalUrl} on this server`, 404));
});
module.exports = app;
