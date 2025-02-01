const mangoose = require('mongoose');



const TransactionSchema = new mangoose.Schema(
    {
        accountnumber:{type:String , required:true},
        toaccountnumber:{type:String, required:true},
        title:{type:String, required:true},
        type:{type:String, required:true},

        refid:{type:String,required:false},


         amount:{type:Number, required:true, default:0},
         date:{type:Date,default:Date.now()


    }

}
)

TransactionSchema.index({title:"text"});


module.exports = mangoose.model("Transaction",TransactionSchema);