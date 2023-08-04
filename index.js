const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const port = 8080;
app.listen(port, () => {
  console.log("App Berjalan Di Port 8080");
});

const masterRouter = require("./src/routers");
app.use(masterRouter);
