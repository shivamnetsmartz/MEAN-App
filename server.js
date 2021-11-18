const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const appRoutes = require("./app/routes/userRoutes")(router);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api", appRoutes);

//http://localhost:8080/api/users

//database connection
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.listen(port, function () {
  console.log("Running the server on port" + port);
});
