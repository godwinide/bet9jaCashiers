const router = require("express").Router();

router.get("/", (req,res) => {
    return res.send("<h1>Loading....</h1>")
})

module.exports = router;
