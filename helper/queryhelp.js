const database = require("../database");
const util = require("util");

module.exports = {
  asyncquery: util.promisify(database.query).bind(database),
};
