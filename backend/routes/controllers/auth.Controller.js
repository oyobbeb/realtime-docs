const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.renderMain = (req, res, next) => {
  try {
    res.status(200).send({ result: "ok" });
  } catch(err) {
    next(err);
  }
}

exports.changeToken = async (req, res, next) => {
  const { email, accessToken, displayName } = req.body;

  try {
    let user;
    user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        password: accessToken,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.send({ result: "ok", token });
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
