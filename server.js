const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/covid-moz";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("conectado com sucesso");
  });
const app = require("./app");

const port = 4000;
server = app.listen(port, () => {
  console.log("listening on port: ", port);
});
