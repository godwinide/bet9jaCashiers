const { mongo } = require("mongoose")

module.exports = async () => {
    try{
        const mongoose = require("mongoose");    
        await mongoose.connect("mongodb://localhost:27017/vflcashiers",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        )
        console.log("mongodb connected...");
        
    }
    catch(err){
        console.log("MONGO ERRor", err)
    }
}