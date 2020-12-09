module.exports = app => {
    app.use("/", require("./routes"));
    app.use("/detail", require("./routes/details"))
    app.use("/api/upload", require("./routes/api/upload"))
    // app.use("*", require("./routes/emptyPage"))
}