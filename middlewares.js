module.exports = app => {
    const express = require("express");
    const expressLayouts = require("express-ejs-layouts");
    const cors = require("cors");
    const bodyParser = require("body-parser")

    
    // view engine
    app.set("view engine", "ejs");
    app.use(expressLayouts);
    // static files
    app.use(express.static("./public"));
    // cors
    app.use(cors())
    // body parser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.text({ type: 'text/plain' }))
}