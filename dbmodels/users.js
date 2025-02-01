const mangoose = require('mongoose');



const UserSchema = new mangoose.Schema(
    {username:{type:String, required:true, unique:true},
    password:{type:String, required:true}

}
)

module.exports = mangoose.model("User",UserSchema);


