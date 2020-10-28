const router = require("express").Router();
const Cashier = require("../../model/Cashier");

router.get("/", async (req,res) => {
    const {whiteBet, sold, tickets, cashierID} = req.query;
    const id = new Date().toDateString().replace(/\s/g, "").toLowerCase()
    const cashier = await Cashier.findOne({cashierID});
    const {history} = cashier;

    async function updateCashier(){
        const exists = history.some(h => h.id === id);
        let newHistory;
        // if it exits, update it
        if(exists){
            newHistory = history.map(h => {
                if(h.id === id){
                    h.sold = sold;
                    h.tickets = tickets;
                    h.wb = whiteBet;
                }
                return h;
            });  
        }else{
            history.push({
                sold,
                tickets, 
                wb: whiteBet,
                date: new Date().toDateString(),
                id: new Date().toDateString().replace(/\s/g, "").toLowerCase()
            });
    
            newHistory = history;
        }   
            
        await Cashier.updateOne({cashierID}, {sold, tickets, wb: whiteBet, history: newHistory});
    }

    if(new Date().getHours() >= 0 && new Date().getHours() <= 15){
        await updateCashier();
        return res.json({success:true});
    }

    else if(parseInt(cashier.tickets) <= parseInt(tickets)){
        await updateCashier();
        return res.json({success:true});
    }

    return res.json({success:true});
})

module.exports = router;