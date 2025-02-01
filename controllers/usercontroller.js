const User = require('../dbmodels/users');


exports.createUser = async(req, res) => {

    const {username,password} = req.query;






    const user = new User({username:username,password:password});

    await user.save();

    res.status(200).json(user);

}

exports.getUsers = async (req, res) => {
    
    const users = await User.find({},{username:1});
    res.status(200).json(users);
};