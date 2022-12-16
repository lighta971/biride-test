import * as express from "express";
import { routes } from "./routes";
import cors = require("cors");

const app = express();

app.use(cors());
app.use(routes);

export default app;
