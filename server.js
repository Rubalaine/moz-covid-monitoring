const mongoose = require("mongoose");
// dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  Shutting down...");
  console.log(err.name, err);
  process.exit(1);
});
// dotenv.config({ path: "./config.env" });
const DB =
  "mongodb+srv://kelven-admin:eu-sou-gostoso@covid-monitor-cluster.tjpr0.mongodb.net/covid-monitor?retryWrites=true&w=majority";
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
const port = process.env.PORT || 8080;
server = app.listen(port, () => {
  console.log("listening on port: ", port);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});
