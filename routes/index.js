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
});

router.get("/deleteUser/:id", async (req,res) => {
    try{
        const {id} = req.params;
        await Cashier.deleteOne({_id:id});
        return res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
});

router.get("/updateUser/:id", async (req,res) => {
    try{
        const context = {title: "Enaland Virtual Admin || Update User"};
        const {id} = req.params;
        const cashier = await Cashier.findOne({_id:id});
        return res.render("updateUser", {...context, cashier});
    }
    catch(err){
        console.log(err);
    }
});

router.post("/updateUser", async (req,res) => {
    try{
        const context = {title: "Enaland Virtual Admin || Update User"};
        const errors = [];
        const success = [];
        const {password, cashierID, id} = req.body;
        if(!password || !id || !cashierID){
            errors.push({msg: "Please enter password!"})
            return res.render("updateUser", {...context, errors, success, cashier:{...req.body}});
        }else{
            await Cashier.updateOne({_id:id}, {password: password, cashierID});
            success.push({msg:"Cashier Updated Successfully"})
            return res.render("updateUser", {...context, errors, success, cashier:{...req.body}});
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;