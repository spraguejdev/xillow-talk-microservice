const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const controller = require("./controller.js");
const db = require("../db");

const app = express();
const port = 8081;
const serve = express.static("./public/dist");

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Serve static files
app.use("/", serve);
app.use(bodyParser.json());

// Handle GET request for index.html
app.get("/:propertyId", (req, res) => {
  res.sendfile(path.resolve(__dirname + "/../public/dist/index.html"));
});

// Handle GET request for all properties
app.get("/api/properties/", controller.handleAllPropertyData);

// Handle GET request for a single property
app.get("/api/properties/:propertyId", controller.handleSinglePropertyData);

app.listen(port, () => {
  console.log(`Hido ho, captn! Listening on port: ${port}`);
});
