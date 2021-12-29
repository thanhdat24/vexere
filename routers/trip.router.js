const express = require("express");
const {
  createTrip,
  getAllTrip,
  getDetailTrip,
  deleteTrip,
  updateTrip,
} = require("../controllers/trip.controllers");
const { checkExist } = require("../middlewares/validations/checkExist");
const { Trip } = require("../models");

const tripRouter = express.Router();
tripRouter.post("/", createTrip);
tripRouter.get("/", getAllTrip);
tripRouter.get("/:id", getDetailTrip);
tripRouter.put("/:id", checkExist(Trip), updateTrip);
tripRouter.delete("/:id", checkExist(Trip), deleteTrip);

module.exports = { tripRouter };
