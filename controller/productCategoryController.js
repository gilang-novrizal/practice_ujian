const database = require("../database");
const { asyncquery, generateQuery } = require("../helper/queryhelp");

module.exports = {
  getProdCat: async (req, res) => {
    try {
      const query = `SELECT * FROM product_category`;
      const result = await asyncquery(query);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addProdCat: async (req, res) => {
    const { product_id, category_id } = req.body;
    try {
      const getCategoryId = `WITH RECURSIVE category_path(id, category, parent_id) AS(
        SELECT id, category, parent_id
        FROM categories
        WHERE id = ${category_id}
        UNION ALL
        SELECT c.id, c.category, c.parent_id
        FROM category_path cp
        JOIN categories c ON cp.parent_id = c.id
      )
      SELECT * FROM category_path
      ORDER BY id
       `;
      const categoryId = await asyncquery(getCategoryId);

      let value = "";
      categoryId.forEach((item) => (value += `(${product_id}, ${item.id}),`));
      const insertQuery = `INSERT INTO product_category (product_id, category_id) 
       VALUES ${value.slice(0, -1)}`;
      const result = await asyncquery(insertQuery);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
