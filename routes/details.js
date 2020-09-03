const router = require("express").Router();
const Cashier = require("../model/Cashier");

router.get("/:id", async (req,res) => {
    const context = {title: "Enland Virtual Admi || Account info"};
    const id = req.params.id;
    if(!id){
        res.redirect("/");
    }else{
        context.cashier = await Cashier.find({cashierID: id});
        res.render("details", context);
    }
})

module.exports = router;