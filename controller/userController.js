const database = require("../database");
const { validationResult } = require("express-validator");
const { asyncquery, generateQuery } = require("../helper/queryhelp");
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY;

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
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const query = `SELECT * FROM users WHERE username = '${username}'`;
      const result = await asyncquery(query);

      if (result.length === 0) {
        return res.status(400).send("Username not found!");
      }

      const hashPass = CryptoJS.HmacMD5(password, SECRET_KEY);
      if (hashPass.toString() !== result[0].password) {
        return res.status(400).send("Invalid Password!");
      }
      res.status(200).send(result[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  register: async (req, res) => {
    const { username, email, password, confpassword } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).send({ errors: error.array() });
    }

    if (password !== confpassword) {
      return res.status(400).send("Password doesn't match");
    }

    try {
      const checkUser = `SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`;
      const resultCheck = await asyncquery(checkUser);

      if (resultCheck.length > 0) {
        return res.status(400).send("Username or Email already used");
      }

      const hashPass = CryptoJS.HmacMD5(password, SECRET_KEY);

      const addUser = `INSERT INTO users (username, password, email, role, status)
                      VALUES (${database.escape(username)}, ${database.escape(
        hashPass.toString()
      )},  ${database.escape(email)}, 'user', 0)`;
      const resultAdd = await asyncquery(addUser);

      const addProfile = `INSERT INTO profile (user_id) VALUES (${resultAdd.insertId})`;
      const result = await asyncquery(addProfile);

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  deleteUser: async (req, res) => {
    const Id = req.params.id;
    const { password } = req.body;
    try {
      const checkId = `SELECT * FROM users WHERE user_id = ${Id}`;
      const resultCheck = await asyncquery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`User with id: ${Id} not found`);
      }

      const hashPass = CryptoJS.HmacMD5(password, SECRET_KEY);
      if (hashPass.toString() !== resultCheck[0].password) {
        return res.status(400).send("Invalid password");
      }

      const del = `DELETE FROM users WHERE user_id = ${Id}`;
      const result = await asyncquery(del);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM users WHERE user_id = ${Id}`;
      const resultCheck = await asyncquery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`User with id: ${Id} not found`);
      }

      const editProf = `UPDATE users SET ${generateQuery(
        req.body
      )} WHERE user_id = ${Id}`;
      const result = await asyncquery(editProf);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
