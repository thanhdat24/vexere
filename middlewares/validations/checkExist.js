const checkExist = (Model) => {
  return async (req, res, next) => {
    // kiểm tra xem station có tồn tại ko
    const { id } = req.params;
    const station = await Model.findOne({ where: { id } });
    if (station) {
      next();
    } else {
      res.status(404).send("Not Found!");
    }
  };
};

module.exports = { checkExist };
