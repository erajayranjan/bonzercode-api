const jwt= require('jsonwebtoken');

//Authentication middleware

exports.requireLogin=(req, res, next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization!='null'){
            const token=req.headers.authorization;
            //Verify Token
            const decode=jwt.verify(token, process.env.JWT_SECRET)
            // Attach token to request
            req.user=decode;
            next();
        }
        else{
            return res.status(401).json({message:"Authorization required!"})
        }

    } catch(err){
        // console.log(err);
        return res.status(401).json({message:"Unauthorized Access!", error:err})
    }
}

// "error": {
//     "name": "JsonWebTokenError",
//     "message": "jwt malformed" // "message": "invalid signature"
// }

// "name": "TokenExpiredError",
//         "message": "jwt expired",
//         "expiredAt": "2022-10-30T18:23:23.000Z"