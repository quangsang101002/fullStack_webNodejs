import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(cors({ credentials: true, origin: true }));

//config app
//cách 1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cách 2
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
