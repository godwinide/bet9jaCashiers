const router = require("express").Router();
const Cashier = require("../model/Cashier");


router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const {from:fromDate, to:toDate} = req.query;
    const context = {title: "Enaland Virtual Admin || cashier-01", cashier:{}, history:[]};
    context.cashier = await Cashier.findOne({cashierID:id});

    if(fromDate && toDate){
        context.history = context.cashier.history.slice().filter(ticket => {
            if(new Date(ticket.date.toString()) >= (new Date(fromDate).setDate(new Date(fromDate).getDate() - 1))
                && new Date(ticket.date.toString()) <= new Date(toDate)){
                return true
            }
            return false;
        })
    }else{
        context.history = context.cashier.history.slice()
    }

    setTimeout(()=>{
        res.render("details", context);
    })
});
module.exports = router;