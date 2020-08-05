const database = require("../database");
const { asyncquery } = require("../helper/queryhelp");

module.exports = {
  // getUserData: (req, res) => {
  //   const query = "SELECT * FROM users";

  //   database.query(query, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send("Internal server error");
  //     }
  //     res.status(200).send(result);
  //   });
  // },
  getUserData: async (req, res) => {
    try {
      const query = "SELECT * FROM users";
      const result = await asyncquery(query);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
