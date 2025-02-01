const mangoose = require('mongoose');



const AccountSchema = new mangoose.Schema(
    {
        // accountnumber, userid, username, availablebalance
        accountnumber:{type:String, required:true, unique:true},
         userid:{type:String,  required:true},
         username:{type:String,  required:false},

         availablebalance:{type:Number, required:true, default:0},
         createdAt:{type:Date,default:Date.now()}

}
)

module.exports = mangoose.model("Account",AccountSchema);