const router = require("express").Router();
const Cashier = require("../../model/Cashier");

router.get("/", async (req,res) => {
    const {whiteBet, sold, tickets, cashierID} = req.query;
    console.log(req.query)
    const update = {
        wb: whiteBet,
        sold,
        tickets
    };
    await Cashier.updateOne({cashierID}, {currentState: {...update}})
    return res.json({success:true})
})

module.exports = router;