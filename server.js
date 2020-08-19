const express = require("express");
const app = express();

require("./db")()
require("./middlewares")(app);
// require("./app")(app);
require("./urls")(app);

const PORT = process.env.PORT || 1960;

app.listen(PORT, console.log(`server started on portr ${PORT}`));