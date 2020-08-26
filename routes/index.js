const router = require("express").Router();
const Cashier = require("../model/Cashier");


router.get("/", async (req,res) => {
    const context = {title: "Enaland Virtual Admin",
     cashiers:[],
     whiteBet: 0,
     sold: 0,
     tickets: 0,
    };



    context.cashiers = await Cashier.find({});
    context.cashiers.forEach(cashier => {
        context.whiteBet += parseInt(cashier.wb);
        context.sold += parseInt(cashier.sold);
        context.tickets += parseInt(cashier.tickets);
    });
    
    res.render("index", context);
});

router.get("/detail/:id", async (req,res) => {
    const id = req.params.id;
    const context = {title: "Enaland Virtual Admin || cashier-01", cashier:{}};
    context.cashier = await Cashier.findOne({cashierID:id});
    res.render("details", context);
});

router.get("/register", (req,res) => {
    const context = {title: "Enaland Virtual Admin || Register", cashier:{}};
    res.render("registerCashier", context);
});

router.post("/register", async(req,res) => {
    const context = {title: "Enaland Virtual Admin || cashier-01", cashier:{}};
    const {
        cashierID,
        password,
        password2
    } = req.body;
    const errors = [];
    const success = [];
    const returnError = () => {
        res.render("registerCashier", {...context, ...req.body, errors, success});
    }
    if(!cashierID || !password || !password2){
        errors.push({msg: "please enter all fields!"});
        return returnError();
    }
    if(password2 !== password){
        errors.push({msg: "Passwords do not match!"});
        return returnError();
    }
    
    const isTaken = await Cashier.findOne({cashierID});
    if(isTaken){
        errors.push({msg:"cashier already exists"});
        return returnError();
    }else{
        const newCashier = new Cashier({
            cashierID: cashierID.trim(),
            password: password.trim()
        });
        await newCashier.save();
        return res.redirect("/");
    }
})

module.exports = router;