const cashiers = require("../model/Cashier");
const startMonitoring = require("./startMonitoring");

async function login(){
    const _cashiers = await cashiers.find({});
    // login on by one
    let index = 0;

    let t = setInterval(()=> {
        if(index === _cashiers.length) {
            clearInterval(t);
            return;
        }
        startMonitoring(_cashiers[index].cashierID, _cashiers[index].password);
        index+=1;
    }, 5000)
}

module.exports = login;