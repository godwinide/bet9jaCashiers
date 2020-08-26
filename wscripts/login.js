const cashiers = require("../model/Cashier");
const startMonitoring = require("./startMonitoring");
const puppeteer = require("puppeteer");

async function login(){
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const _cashiers = await cashiers.find({});
    // login on by one
    let index = 0;

    let t = setInterval(()=> {
        if(index === cashiers.length) {
            clearInterval(t);
            return;
        }
        startMonitoring(browser, _cashiers[index].cashierID, _cashiers[index].password);
        index+=1;
    }, 15000)
}

module.exports = login;