const mongoose = require("mongoose");

// require("dotenv").config();


const url = "mongodb://localhost:27017/testapp" ;

// const connectDB = async () => {

//     try
//     {
//        await mongoose.connect(url, {});
//        console.log("Database is connected");

//     }
//     catch(e)
//     {
//         console.log(e);
//         process.exit(1);

//     }
// }

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("MongoDB connected Successfully");
}).catch((e) => 
{
  console.log(e);
  
}

);

module.exports  = mongoose;


