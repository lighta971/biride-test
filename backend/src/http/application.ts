import * as express from "express";
// import mysqlConnection from "../data/mysql.connection";
import { routes } from "./routes";
import cors = require("cors");

// mysqlConnection.connect();

const app = express();

// app.use((_req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
// });
app.use(cors());
app.use(routes);

export default app;
