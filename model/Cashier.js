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
    currentState:{
        type: Object,
        required: false,
        default: {wb:0, sold:0, winnings:[], tickets:0, lastTicket:{}, firstTicket:{}}
    },
    history: {
        type: Array,
        required: false,
        default: []
    }
});

module.exports = Cashier = model("Cashier", CashierSchema);

