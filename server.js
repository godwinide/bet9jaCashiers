const express = require("express");
const app = express();
const login = require("./wscripts/login");

require("./db")()
require("./middlewares")(app);
require("./urls")(app);

// start monitoring
login()

const PORT = process.env.PORT || 1960;

app.listen(PORT, console.log(`server started on portr ${PORT}`));