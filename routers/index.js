const express = require("express");
const { stationRouter } = require("./station.router");

const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);

module.exports = { rootRouter };
