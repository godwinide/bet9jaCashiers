const {model, Schema} = require("mongoose");

const CashierSchema = new Schema({
    cashierID: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sold:{
        type: String,
        required: false,
        default: "0"
    },
    wb:{
        type: String,
        required: false,
        default: "0"
    },
    tickets: {
        type: String,
        required: false,
        default: "0"
    }
});

module.exports = Cashier = model("Cashier", CashierSchema);

