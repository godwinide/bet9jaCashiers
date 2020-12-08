const router = require("express").Router();

router.get("/", (req,res) => {
    return res.render("emptyPage", {layout:false})
})

module.exports = router;
