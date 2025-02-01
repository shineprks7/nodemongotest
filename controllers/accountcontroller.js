
const Account = require('../dbmodels/useraccount');

// createAccount, getAccountById, updateAccount, deleteAccount
// getAccounts
exports.createAccount = async(req, res) => {

    // accountnumber, userid, username, availablebalance

    const { _id, userid,username,availablebalance } = req.body;
  
    if(_id == 0)
    {

    const counts = await Account.countDocuments({'userid':userid});


    let accountnumber = "AB0001004"+ counts +userid;

    

    const account = new Account({userid:userid,accountnumber:accountnumber,username:username,availablebalance:availablebalance});

    await account.save();

    res.status(200).json(account);
    }
    else if(_id != 0 && __id != '')
    {

        const { _id } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json(updatedAccount);

    }

}


exports.getAccounts = async (req, res) => {
    
    const accounts = await Account.find();
    res.status(200).json(accounts);
};

exports.getAccountById = async (req, res) => {
    const { id } = req.body;

    const accounts = await Account.findById(id);
    res.status(200).json(accounts);
};

exports.updateAccount = async (req, res) => {
    const { id } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAccount);
};

exports.deleteAccountById = async (req, res) => {

    const { id } = req.body;

    await Account.findByIdAndDelete(id);
    res.status(200).json({ message: "Account deleted" });
};