import dotenv = require("dotenv");
dotenv.config();

import app from "./http/application";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
