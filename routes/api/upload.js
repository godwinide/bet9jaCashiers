const router = require("express").Router();
const Cashier = require("../../model/Cashier");

router.get("/", async (req,res) => {
    const {whiteBet, sold, tickets, cashierID} = req.query;
    await Cashier.updateOne({cashierID}, {sold, tickets, wb:whiteBet})
    return res.json({success:true});
})

module.exports = router;