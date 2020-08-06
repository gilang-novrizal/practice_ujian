const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
  createToken: (data) => {
    return jwt.sign(data, TOKEN_KEY, { expiresIn: "120s" });
  },
};
