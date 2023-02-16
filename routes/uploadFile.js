
const router=require('express').Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const File= require('../models/uploadFile');

// const {requireLogin}= require('../middleware/auth')


// Load the SDK and UUID
const fs = require('fs');
const AWS = require('aws-sdk');
const { upload } = require('../helpers/aws-upload');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
});

const fileName = 'contacts.csv';

const uploadFile = (fileName, file) => {
     const params = {
         Bucket: process.env.AWS_BUCKET_NAME, // pass your bucket name
         Key: fileName, // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(file, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
         return data.Location;
     });
  
};

// uploadFile();

router.post('/images',
//  validateImageType, validateImageExtension, validateImageObject, validate,
  async (req, res, next) =>{
    const base64Image = req.body.image;
    const imageName = req.body.imageName;
    const type = req.body.type;
    let response;

    console.log(base64Image,">>>>>>>>>>>>>>>>>>", imageName)

    try {
        response = await uploadFile(imageName, base64Image);
    } catch (err) {
        console.error(`Error uploading image: ${err.message}`);
        return next(new Error(`Error uploading image: ${imageName}`));
    }

    res.send({link: response});
})

module.exports=router



// const busboy=require('busboy');
// // const S3Client=require('aws-sdk/clients')
// const {S3Client ,  upload}=require("@aws-sdk/client-s3");
// // const {upload}=require("@aws-sdk/lib-storage");

// const config={
//    api:{
//     bodyParser:false
//    }
// }

// const s3=new S3Client({region:process.env.AWS_REGION});

// const uploadFile=(req, res) => { 
//     const bb=busboy({headers:req.headers})
//     bb.on("file", async(_, file, info)=>{
//         const fileName=info.fileName;
//         try{
//             const parallelUpload=new upload({
//                 client:s3,
//                 queSize:4,
//                 partSize:1024*1024*5,
//                 leavePartsOnError:false,
//                 params:{
//                     Bucket:process.env.AWS_BUCKET_NAME,
//                     Key:`${Math.random().toString(26).substring(2)}-${fileName}`,
//                     Body:file,
//                 },
//             })
//         }
//         catch(e){
//             console.log(e)
//         }
//     })

//     bb.on("close", () => { 
//         res.writeHead(200, {connection:"close"});
//         res.end("File Uploaded.")
//      });
//      req.pipe(bb);
//      return;
//  }


