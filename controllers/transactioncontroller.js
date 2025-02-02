const Transaction = require("../dbmodels/transaction");
const Account = require("../dbmodels/useraccount");

const {Parser} = require("json2csv");


//sendMoney, getAllTransactions, getAllTransactionByAccount, getAllTransactionByAccountSearchAndFilter

exports.sendMoney = async (req, res) => {

    try
    {
    const { accountnumber,toaccountnumber, type, amount, title } = req.body;
   
    const fromAccount = await Account.findOne({'accountnumber':accountnumber});

    const toAccount = await Account.findOne({'accountnumber':toaccountnumber});

    if (!fromAccount && !toAccount){

    return res.status(404).json({ message: "Account not found" });

    }

    if ( fromAccount.availablebalance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

    fromAccount.availablebalance = fromAccount.availablebalance - amount;
    toAccount.availablebalance = toAccount.availablebalance + amount;

    
    await fromAccount.save();
     
    await toAccount.save();


    const toTransaction = new Transaction({ accountnumber: accountnumber,toaccountnumber:toaccountnumber, type:'debit', amount:amount, title:title });
  
    const fromTransaction = new Transaction({ accountnumber: toaccountnumber,toaccountnumber:accountnumber, type:'credit', amount:amount, title:title });

    await toTransaction.save();
    await fromTransaction.save();

    res.status(200).json({ message: "Success" });

   }
   catch(e)
   {
    res.status(400).json({ message: e });

   }
};

exports.getAllTransactions = async (req, res) => {


      const transactions = await Transaction.find().populate();
        res.status(200).json(transactions);

   
    res.status(200).json(transactions);
};

exports.getAllTransactionByAccount = async (req, res) => {

    const { accountnumber } = req.body;

      const transactions = await Transaction.find({accountnumber:accountnumber}).populate();
        
      
      res.status(200).json(transactions);

   
};




exports.getAllTransactionByAccountSearchAndFilter = async (req, res) => {

    const { accountnumber , fromdate, todate, search } = req.body;


    let isValid = function(value)
    {
        if(typeof value != undefined && value != null && value != "")

        {

            return true;

        }

        return false;
    }
     

      let transactions;

      if(search != '')
      {
        if( isValid(todate) && isValid(fromdate) )
            {
                let fromdateFormatted = new Date(fromdate);
    
                 let todateFormatted = new Date(todate);
            
              transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$gte:fromdateFormatted, $lte:todateFormatted}});
    
            }
            else if(isValid(fromdate))
            {
                let fromdateFormatted = new Date(fromdate);
    
                transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$gte:fromdateFormatted}});
    
            }
            else if(isValid(todate))
            {
                let todateFormatted = new Date(todate);
    
                transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$lte:todateFormatted}});
    
            }
            else
            {
                transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"}});
            
            }

    }
    else
    {
        if( isValid(todate) && isValid(fromdate) )
            {
                let fromdateFormatted = new Date(fromdate);

             let todateFormatted = new Date(todate);
            
                transactions = await Transaction.find({accountnumber:accountnumber, date:{$gte:fromdateFormatted, $lte:todateFormatted}});
    
            }
            else if(isValid(fromdate))
            {
                let fromdateFormatted = new Date(fromdate);

                transactions = await Transaction.find({accountnumber:accountnumber,date:{$gte:fromdateFormatted}});
    
            }
            else if(isValid(todate))
            {
                let todateFormatted = new Date(todate);

                transactions = await Transaction.find({accountnumber:accountnumber,date:{$lte:todateFormatted}});
    
            }
            else
            {
                transactions = await Transaction.find({accountnumber:accountnumber});

            }
    }

   


   
    res.status(200).json(transactions);
};
exports.csvExportBySearchFilter = async (req, res) => {

    const { accountnumber , fromdate, todate, search } = req.query;




    let isValid = function(value)
    {
        if(typeof value != undefined && value != null && value != "")

        {

            return true;

        }

        return false;
    }


    
     

      let transactions;

      try
      {

      if(search != '')
      {
        if( isValid(todate) && isValid(fromdate) )
        {
            let fromdateFormatted = new Date(fromdate);

             let todateFormatted = new Date(todate);
        
          transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$gte:fromdateFormatted, $lte:todateFormatted}}).lean();

        }
        else if(isValid(fromdate))
        {
            let fromdateFormatted = new Date(fromdate);

            transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$gte:fromdateFormatted}}).lean();

        }
        else if(isValid(todate))
        {
            let todateFormatted = new Date(todate);

            transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"},date:{$lte:todateFormatted}}).lean();

        }
        else
        {
            transactions = await Transaction.find({accountnumber:accountnumber,title:{"$regex":search,"$options":"i"}}).lean();
        
        }

    }
    else
    {
        if( isValid(todate) && isValid(fromdate) )
            {
                let fromdateFormatted = new Date(fromdate);

             let todateFormatted = new Date(todate);
            
                transactions = await Transaction.find({accountnumber:accountnumber, date:{$gte:fromdateFormatted, $lte:todateFormatted}}).lean();
    
            }
            else if(isValid(fromdate))
            {
                let fromdateFormatted = new Date(fromdate);

                transactions = await Transaction.find({accountnumber:accountnumber,date:{$gte:fromdateFormatted}}).lean();
    
            }
            else if(isValid(todate))
            {
                let todateFormatted = new Date(todate);

                transactions = await Transaction.find({accountnumber:accountnumber,date:{$lte:todateFormatted}}).lean();
    
            }
            else
            {
                transactions = await Transaction.find({accountnumber:accountnumber}).lean();

            }
    }

    if(!transactions && transactions.length == 0)
    {

        res.status(404).json({"message":"not found"});

        return false;


    }
       
   
    const parser = new Parser();

    const csv = parser.parse(transactions);

    res.setHeader('Content-Type','text/csv');

    res.setHeader('Content-Disposition','attachment',filename=transactions.csv);



   
    res.status(200).send(csv);

}
catch(e)
{



    res.status(401).json({"error":e});


}
    
    


    
};




