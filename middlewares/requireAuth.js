const jwt = require("jsonwebtoken");
const config = require("config");

const requireAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ msg: "No token, Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ msg: "Invalid Token" });
  }
};

module.exports = requireAuth;
