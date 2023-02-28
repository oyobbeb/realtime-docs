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

exports.renderMyDocs = async (req, res, next) => {
  const { email } = req.body;

  const document = await Doc.find();
  const mydocs = document.filter(doc => doc.createdById === email);

  try {
    res.status(200).send({ result: "ok", mydocs });
  } catch(err) {
    next(err);
  }
}

exports.renderEachDoc = async (req, res, next) => {
  const { id } = req.params;

  const document = await Doc.findById({ _id: id });

  try {
    res.status(200).send({ result: "ok", document });
  } catch(err) {
    next(err);
  }
}

exports.updateContents = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, updateContents} = req.body;

  const document = await Doc.findByIdAndUpdate({ _id: id }, { title, description, contents: updateContents } );

  try {
    res.status(302).send({ result: "ok", document });
  } catch(err) {
    next(err);
  }
}
