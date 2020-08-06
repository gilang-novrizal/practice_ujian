const database = require("../database");
const { asyncquery, generateQuery } = require("../helper/queryhelp");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const query = `SELECT * FROM product`;
      const result = await asyncquery(query);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addProduct: async (req, res) => {
    const { name, price, stock } = req.body;
    try {
      const checkResult = `SELECT * FROM product WHERE name= ${database.escape(
        name
      )}`;
      const resultCheck = await asyncquery(checkResult);

      if (resultCheck.length > 0) {
        return res.status(400).send("Product already registered!");
      }

      const add = `INSERT INTO product (name, price, stock) VALUES(${database.escape(
        name
      )}, ${database.escape(price)}, ${database.escape(stock)})`;
      const result = await asyncquery(add);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  editProduct: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM product WHERE id = ${database.escape(Id)}`;
      const resultCheck = await asyncquery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`Product with id = ${Id} doesn\'t exist`);
      }

      const edit = `UPDATE product SET ${generateQuery(
        req.body
      )} WHERE id = ${database.escape(Id)}`;
      const result = await asyncquery(edit);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
