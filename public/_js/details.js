const date1 = document.querySelector("#date1");
const date2 = document.querySelector("#date2");
const dates = document.querySelectorAll(".date")





// set total
function calculatePage(){
    const wb = document.querySelectorAll(".wb");
    const sold = document.querySelectorAll(".sold");
    const tickets = document.querySelectorAll(".tickets");

    const totalwb = document.querySelector(".total-wb");
    const totaltickets = document.querySelector(".total-tickets");
    const totalsold = document.querySelector(".total-sold");


    let _wb_total = 0;
    let _sold_total = 0;
    let _ticket_total = 0;
    
    wb.forEach(w => {
        _wb_total += parseInt(w.innerText.replace(/,/g, ""));
    });

    _ticket_total = 0;
    tickets.forEach(t => {
        _ticket_total += parseInt(t.innerText.replace(/,/g, ""));
    });

    _sold_total = 0;
    sold.forEach(s => {
        _sold_total += parseInt(s.innerText.replace(/,/g, ""));
    });

    setTimeout(()=> {
        totalwb.innerText = _wb_total;
        totalsold.innerText = _sold_total;
        totaltickets.innerText = _ticket_total;

        formatString();
    })

}


setInterval(calculatePage, 500)




date1.value = moment().subtract(7, "days").format("YYYY-MM-DD");
date2.value = moment().format("YYYY-MM-DD");

dates.forEach(d => {
  d.innerText = moment(d.innerText).format("DD-MM-YYYY")
})