const User = require("../../models/User");
const Doc = require("../../models/Doc");
const jwt = require("jsonwebtoken");

exports.renderMain = async (req, res, next) => {
  const docs = await Doc.find();

  try {
    res.status(200).send({ result: "good", docs });
  } catch(err) {
    next(err);
  }
}

exports.changeToken = async (req, res, next) => {
  const { email, accessToken, displayName, uid, photoURL } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        password: accessToken,
        uid,
        photoURL
      });
    }
    const allUsers = await User.find();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.send({ result: "ok", token, allUsers });
  } catch(err) {
    next(err);
  }
}

exports.renderSignin = (req, res, next) => {
  try {
    res.status(200).send({ result: "ok" });
  } catch(err) {
    next(err);
  }
}

