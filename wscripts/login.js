
const puppeteer = require("puppeteer");

async function login(cashierID, password){
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto("https://vsagent.bet9ja.com/bet9ja-cashier-league/login/");
    
        page.evaluate(async(cashierID, password)=> {
                let inputU = document.querySelectorAll("input")[0];
                let inputP = document.querySelectorAll("input")[1];
                let inputL = document.querySelector("a.btn");
                inputU.value = cashierID;
                inputP.value = password;
                inputL.click();    
        }, cashierID, password);

        setTimeout(()=> {
            // new stuff
            page.evaluate((cashierID) => {
                document.querySelector(".button-admin-title").click();
                setTimeout(()=>{
                    function calc(){
                  
                        let state = {
                            page: 1,
                            whiteBet: 0,
                            ended: false,
                            tickets: 0,
                            sold: 0,
                            date: new Date().toLocaleDateString()
                        }
                        
                        async function  getPage(page=1) {
                            const request = new Request(`https://vsagent.bet9ja.com/shopadmin/tabs/ticketspage.php?p=${page}&t=s&flh=0&ph=1&lls=0`, {
                            headers: new Headers({
                                "Host": "vsagent.bet9ja.com",
                                "X-Requested-With": "XMLHttpRequest"
                            })
                        })
                  
                        const req = await fetch(request);
                        const res = await req.text();
                        return res;
                    
                        }
                        
                        async function calculateWhiteBet() {
                            const pageContent = await getPage(state.page);
                            document.querySelector("#twrap").innerHTML = pageContent;
                            // start calculating
                            let rows = document.querySelectorAll("#twrap table tbody tr");
                        
                            rows.forEach((r,i) => {
                            if(i != 0 && i <=12){
                                let _win = r.querySelectorAll("td")[8];
                                let _stake = r.querySelectorAll("td")[5];
                                let date = new Date(r.querySelectorAll("td")[1].innerText).getDate() === new Date().getDate();  
                                if(date){
                                // update dom
                                state.tickets += 1;
                                state.sold += parseInt(_stake.innerText);
                                if(_win && i !== 0 && i <= 12){
                                    let win = _win.innerText.replace(/.00/, "");
                                    if(win.length > 0 && win.length < 2){
                                    state.whiteBet += parseInt(win[0]);
                                    }else if(win.length > 1){
                                    state.whiteBet += parseInt(win.slice(win.length - 2));
                                    }
                                }
                                }  else{
                                state.ended = true;
                                // update dom
                                uploadRes();
                                setTimeout(calc,320000)
                                }
                            }
                            })
                        
                            if(state.ended === false){
                            state.page += 1;
                            calculateWhiteBet();  
                            }
                        }
                  
                        //upload to server
                        async function  uploadRes() {
                            const req = await fetch(`http://localhost:1960/api/upload?whiteBet=${state.whiteBet}&tickets=${state.tickets}&sold=${state.sold}&cashierID=${cashierID}`);
                            const res = await req.text();
                            return res;
                        }
                        
                        
                        function init(){
                            // reset state
                            state.whiteBet = 0;
                            state.page = 1;
                            state.ended = false;
                            state.tickets = 0;
                            document.querySelector("html").innerHTML += "<div id='twrap'></div>"
                            calculateWhiteBet();
                        }
                        
                        init();
                        }
                  
                        calc()
                  },10000)
            }, cashierID)
            // end of new stuff
        }, 15000);

}

module.exports = login