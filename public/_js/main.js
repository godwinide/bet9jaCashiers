function formatString(){
    const total = document.querySelectorAll(".f-string");

    const format = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    total.forEach(el => {
        el.innerText = format(el.innerText)
    })

}

formatString();