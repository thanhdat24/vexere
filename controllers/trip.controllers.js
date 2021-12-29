const { Trip, Station } = require("../models");
const createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const newTrip = await Trip.create({
      fromStation,
      toStation,
      startTime,
      price,
    });
    res.status(201).send(newTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllTrip = async (req, res) => {
  try {
    const tripList = await Trip.findAll({
      // In ra nơi đi, nơi đến của các chuyến đi
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });
    res.status(200).send(tripList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const detailTrip = await Trip.findOne({
      where: { id },
      // In ra nơi đi, nơi đến của các chuyến đi
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });
    res.status(200).send(detailTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    await Trip.update(
      { fromStation, toStation, startTime, price },
      { where: { id } }
    );
    res.status(200).send("Update thành công id :" + id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    await Trip.destroy({ where: { id } });
    res.status(200).send("Delete success!");
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createTrip,
  getAllTrip,
  getDetailTrip,
  deleteTrip,
  updateTrip,
};
