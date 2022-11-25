import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
