module.exports = app => {
    app.use("/", require("./routes"));
    app.use("/api/upload", require("./routes/api/upload"))
}