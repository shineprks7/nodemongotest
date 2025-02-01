const jwt = require('jsonwebtoken');


const User = require('../dbmodels/users');


exports.login = async(req, res) => {

  const {username, password} = req.body;

  const user = await User.findOne(username);

   if(!user)
   {
     return res.status(401).json({'message':'Invalid Username'});


   }
   if(user && user.password != password)

   {
    return res.status(401).json({'message':'Invalid Username or Password'});
 
   }

   const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {'expiresIn':'1h'});

   res.json({token,userId:user._id});
   
};