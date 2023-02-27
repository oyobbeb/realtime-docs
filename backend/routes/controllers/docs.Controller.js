const Doc = require("../../models/Doc");

exports.renderDocs = (req, res, next) => {
  const { user } = req;

  try {
    res.status(200).send({ result: "ok", user });
  } catch(err) {
    next(err);
  }
}
