const Doc = require("../../models/Doc");

exports.renderDocs = (req, res, next) => {
  const { user } = req;

  try {
    res.status(200).send({ result: "ok", user });
  } catch(err) {
    next(err);
  }
}

exports.saveNewDocs = async (req, res, next) => {
  const { title, description, contents, displayName, email } = req.body;

  const document = await Doc.create({
    title,
    description,
    contents,
    createdBy: displayName,
    createdById: email,
  });

  try {
    res.status(200).send({ result: "ok", document });
  } catch(err) {
    next(err);
  }
}
