const express = require("express"); // framework RESTAPI
const cors = require("cors"); // handle req. body dari user(raw data) => hasil => req.body
const bodyparser = require("body-parser"); // allow sharing resource dari luar
const dotenv = require("dotenv"); // baca file .env => environment variable

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

const database = require("./database");
database.connect((err) => {
  if (err) return console.error("error connecting :" + err.stack);
  console.log("connected as id : " + database.threadId);
});

const {
  userRouter,
  productRouter,
  productCategoryRouter,
} = require("./router");
app.use(userRouter);
app.use(productRouter);
app.use(productCategoryRouter);

// binding / host in local computer
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
