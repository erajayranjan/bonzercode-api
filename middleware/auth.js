const jwt= require('jsonwebtoken');

//Authentication middleware

exports.requireLogin=(req, res, next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization!='null'){
            const token=req.headers.authorization.split(' ')[1];
            //Verify Token
            const decode=jwt.verify(token, process.env.JWT_SECRET)
            // Attach token to request
            req.user=decode;
            next();
        }
        else{
            return res.status(400).json({message:"Unauthorized Access!"})
        }

    } catch(err){
        console.log(err.message);
    }
}